import React, { Component } from "react"
import technologies from "../../../data/Technologies"
import "./Technologies.scss"
const _ = require("lodash")

function getPrintedXP(years, months) {
  if (months >= 6) {
    years += 1
  }

  if (months > 0 && years === 0) return "( " + months + " mo )"
  if (years === 1) return "( 1 yr )"
  if (years > 1) return "( " + years + " yrs )"
  return "( < 1 mo )"
}

class Technologies extends Component {
  constructor(props) {
    super(props)

    this.state = {
      elaborated: false
    }
  }

  isElaborate = () => {
    return this.state.elaborated
  }

  toggle = () => {
    this.setState({ elaborated: !this.isElaborate() })
  }

  getXP = (existingXP, start) => {
    if (existingXP) {
      return getPrintedXP(existingXP, 0)
    }

    if (start) {
      const day = 1000 * 60 * 60 * 24
      let end = new Date()
      let diff = Math.floor(end.getTime() - start.getTime())
      let days = Math.floor(diff / day)
      let months = Math.ceil(days / 31)
      let years = Math.floor(months / 12)
      return getPrintedXP(years, months)
    }

    return ""
  }

  render() {
    const toptal = technologies.slice(0, 5)
    const hidden = technologies.slice(5, technologies.length)

    return (
      <div className="technologies">
        {toptal.map((item) => (
          <span
            key={`technologies-${_.kebabCase(item.name.toLowerCase())}`}
            className={`tag ${item.current ? "current" : ""}`}>
            {item.name}
            <span className="xp">{this.getXP(item.xp, item.start)}</span>
          </span>
        ))}
        <div className="button" onClick={this.toggle}>
          {this.isElaborate() ? "less" : "more"}
        </div>
        <div
          className={`elaborate ${this.isElaborate() ? "elaborated" : ""}`}
        >
          {hidden.map((item) => (
            <span
              key={`technologies-${_.kebabCase(item.name.toLowerCase())}`}
              className={`tag ${item.current ? "current" : ""}`}>
              {item.name}
              <span className="xp">{this.getXP(item.xp, item.start)}</span>
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default Technologies
