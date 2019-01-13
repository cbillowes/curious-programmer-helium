import React from "react";
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
      el.value = str.replace(/<br\/>/gi, "\n").replace(/copied!/gi, "").replace(language, "")
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
        <Navigation />
        {children}
        <Footer />
      </div>
    )
  }
}
