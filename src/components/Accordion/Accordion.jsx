import React, { Component } from "react"
import "./Accordion.scss"

class Accordion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: this.props.content,
      isAccordion: props.content.trim().startsWith(`<div id="accordion"></div>`)
    }
  }

  componentDidMount() {
    if (!this.state.isAccordion) return

    document
      .getElementsByClassName("body")[0]
      .childNodes.forEach(function(node) {
        node.outerHTML = `<div id="accordion"></div>`
      })

    let content = this.createElementFromHTML(this.state.content)
    let nodes = this.parse(content.childNodes)
    let accordion = document.getElementById("accordion")
    accordion.appendChild(nodes.introduction)

    nodes.cards.forEach(node => {
      let card = document.createElement("div")
      let heading = document.createElement("div")
      let cardContainer = document.createElement("div")
      let body = document.createElement("div")

      card.classList.add("card")
      heading.classList.add("card-header")
      cardContainer.classList.add("collapse")
      body.classList.add("card-body")

      heading.innerHTML = node.title.outerHTML
      body.innerHTML = node.body.outerHTML

      cardContainer.appendChild(body)
      card.appendChild(heading)
      card.appendChild(cardContainer)
      document.getElementById("accordion").appendChild(card)
    })
    this.removeAnchors()

    document.querySelectorAll("#accordion h2").forEach(element => {
      element.onclick = function() {
        let card = element.parentElement.parentElement
        let collapse = card.children[1]
        if (collapse.classList.contains("show")) {
          collapse.classList.remove("show")
        } else {
          collapse.classList.add("show")
        }
      }
    })
  }

  createElementFromHTML(htmlString) {
    let div = document.createElement("div")
    div.innerHTML = htmlString.trim()
    return div
  }

  parse(elements) {
    let parsed = {
      introduction: document.createElement("div"),
      cards: []
    }

    let cardIndex = 0
    elements.forEach(function(element) {
      const tagName = element.tagName

      if (tagName === "H2") {
        let heading = createCard(element)
        parsed.cards.push(heading)
        cardIndex++
      } else {
        if (element) {
          let card = parsed.cards[cardIndex - 1]
          if (card) {
            if (element.nodeName !== "#text") {
              card.body.appendChild(element)
            }
          } else {
            parsed.introduction.appendChild(element)
          }
        }
      }
    })
    return parsed
  }

  removeAnchors() {
    document.querySelectorAll("#accordion .anchor").forEach(function(element) {
      element.outerHTML = ""
    })
  }

  render() {
    return <div />
  }
}

function createCard(element) {
  return {
    title: element,
    body: document.createElement("div")
  }
}

export default Accordion
