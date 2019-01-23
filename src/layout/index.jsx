import React from "react";
import Helmet from "react-helmet"
import Navigation from "../components/Navigation/Navigation"
import Footer from "../components/Footer/Footer"
import "./layout.scss"
const $ = require("jquery")

export default class MainLayout extends React.Component {
  componentDidMount() {
    $("pre").each(function () {
      let stuff = $("<div />").addClass("stuff")
      const language = $("<div />").addClass("language")
      const copy = $("<div />").addClass("copy").text("copy")

      const element = $(this)
      const lang = element.attr("class").replace(/language\-/i, "")
      if (lang === "extract" || lang === "example") {
        stuff.append(language)
        element.append(stuff)
        element.find(".language").text(lang)
      } else {
        language.text(lang)
        stuff.addClass("stuff").append(language).append(copy)
        element.append(stuff)
        element.find(".copy").click(function () {
          const text = $(this).parent().parent().text()
          const copy = $(this)
          copyToClipboard(text, lang)
          copy.text("copied!")
          setTimeout(function() {
            copy.text("copy")
          }, 2500)
        })
      }
    })

    const copyToClipboard = (str, language) => {
      const el = document.createElement("textarea")
      el.value = str
        .replace(/<br\/>/gi, "\n")
        .replace(/copied!/gi, "")
        .replace(/copy/gi, "")
        .replace(language, "")
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
    }
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <Helmet>
          <link href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css" />
        </Helmet>
        <Navigation />
        {children}
        <Footer />
      </div>
    )
  }
}
