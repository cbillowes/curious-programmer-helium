const path = require("path")
const _ = require("lodash")
const moment = require("moment")
const siteConfig = require("./data/SiteConfig")
const postNodes = []

function addSiblingNodes(createNodeField) {

  postNodes.sort(
    ({ frontmatter: { date: date1 } }, { frontmatter: { date: date2 } }) => {
      const dateA = moment(date1, siteConfig.dateFromFormat)
      const dateB = moment(date2, siteConfig.dateFromFormat)

      if (dateA.isBefore(dateB)) return 1

      if (dateB.isBefore(dateA)) return -1

      return 0
    }
  )
  for (let i = 0; i < postNodes.length; i += 1) {
    const nextID = i + 1 < postNodes.length ? i + 1 : 0
    const prevID = i - 1 > 0 ? i - 1 : postNodes.length - 1
    const currNode = postNodes[i]
    const nextNode = postNodes[nextID]
    const prevNode = postNodes[prevID]
    createNodeField({
      node: currNode,
      name: "nextTitle",
      value: nextNode.frontmatter.title
    })
    createNodeField({
      node: currNode,
      name: "nextSlug",
      value: nextNode.fields.slug
    })
    createNodeField({
      node: currNode,
      name: "prevTitle",
      value: prevNode.frontmatter.title
    })
    createNodeField({
      node: currNode,
      name: "prevSlug",
      value: prevNode.fields.slug
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/blog/${_.kebabCase(node.frontmatter.title)}`
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/blog/${_.kebabCase(node.frontmatter.slug)}`
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat)
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter)

        createNodeField({
          node,
          name: "date",
          value: date.toISOString()
        })
      }
    }
    createNodeField({ node, name: "slug", value: slug })
    postNodes.push(node)
  }
}

exports.setFieldsOnGraphQLNodeType = ({ type, actions }) => {
  const { name } = type
  const { createNodeField } = actions
  if (name === "MarkdownRemark") {
    addSiblingNodes(createNodeField)
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postPage = path.resolve("src/templates/post.jsx")
    const tagPage = path.resolve("src/templates/tag.jsx")
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  excerpt
                  timeToRead
                  frontmatter {
                    tags
                    title
                    cover
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors)
          reject(result.errors)
        }

        let idx = 0;
        postNodes.map(node => {
          let previous = idx - 1 < 0 ? postNodes[postNodes.length - 1]: postNodes[idx - 1]
          let next = idx + 1 >= postNodes.length ? postNodes[0] : postNodes[idx + 1]

          createPage({
            path: node.fields.slug,
            component: postPage,
            context: {
              slug: node.fields.slug,
              prev: previous.fields.slug,
              next: next.fields.slug
            }
          })
          idx += 1;
        })

        const tagSet = new Set()
        let edges = result.data.allMarkdownRemark.edges
        edges.forEach(edge => {
          if (edge.node.frontmatter.tags) {
            edge.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag)
            })
          }
        })

        const tagList = Array.from(tagSet)
        tagList.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag
            }
          })
        })
      })
    )
  })
}
