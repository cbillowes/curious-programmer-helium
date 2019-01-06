module.exports = {
  post: {
    html: "<p>A simple write up<br/>about this post.</p>",
    excerpt: "A simple excerpt about this post.",
    timeToRead: 1,
    fields: {
      slug: "/path/to/this/post"
    },
    frontmatter: {
      title: "This post",
      cover: "this-post-background.png",
      tags: ["this", "post"]
    }
  },
  prev: {
    html: "<p>A simple write up<br/>for the previous post.</p>",
    excerpt: "A simple excerpt about the previous post.",
    timeToRead: 1,
    fields: {
      slug: "/path/to/previous/post"
    },
    frontmatter: {
      title: "Previous post",
      tags: ["previous", "post"]
    }
  },
  next: {
    html: "<p>A simple write up<br/>for the next post.</p>",
    excerpt: "A simple excerpt about the next post.",
    timeToRead: 1,
    fields: {
      slug: "/path/to/next/post"
    },
    frontmatter: {
      title: "Next post",
      tags: ["next", "post"]
    }
  }
}