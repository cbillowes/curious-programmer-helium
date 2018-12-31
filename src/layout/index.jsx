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
      const copy = $("<div />").addClass("copy").text("Copy")
      stuff.append(language).append(copy)

      const element = $(this)
      const lang = element.attr("class").replace(/language\-/i, "")
      element.append(stuff)
      element.find(".language").text(lang)
      element.find(".copy").click(function () {
        const text = $(this).parent().parent().text()
        const copy = $(this)
        copyToClipboard(text, lang)
        copy.text("Copied!")
        setTimeout(function() {
          copy.text("Copy")
        }, 2500)
      })
    })

    const copyToClipboard = (str, language) => {
      const el = document.createElement("textarea")
      el.value = str.replace(/<br\/>/gi, "\n").replace(/Copied!/gi, "").replace(language, "")
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
