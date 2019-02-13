import React, { Component } from "react"
import Moment from "react-moment"
import Tags from "../../Tag/Tags"
import "./Metadata.scss"
const moment = require("moment")

class Metadata extends Component {
  renderMoment = (date) => {
    var now = moment()
    var then = moment(date)
    var diff = now.diff(then, 'days')

    if (diff > 7) {
      return (
        <Moment date={date} format="ddd, D MMMM YYYY" />
      )
    } else {
      return (
        <Moment date={date} format="D MMMM YYYY" />
      )
    }
  }

  renderDate = (date, calendarStrings) => {
    if (date) {
      return (
        <span>
          posted
          {" "}
          <Moment className="moment" date={date} calendar={calendarStrings} />
          {" "}
          on
          {" "}
          <span className="date">{this.renderMoment(date)}</span>
        </span>
      )
    }
    return (<span />)
  }

  renderTimeToRead = (timeToRead) => {
    if (timeToRead) {
      return (
        <span>
          {<span className="timeToRead">timeToRead</span> && <span>(Est. {timeToRead} minute read)</span>}
        </span>
      )
    }
  }

  render() {
    const { tags, date, timeToRead } = this.props
    moment.updateLocale("en")
    let theDate = new Date(date)
    var fromNow = moment([theDate.getFullYear(), theDate.getMonth(), theDate.getDate()]).fromNow();
    const calendarStrings = {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      lastWeek: '[last] dddd',
      nextWeek: 'dddd',
      sameElse: `[${fromNow}]`
    }

    return (
      <div className="post-metadata">
        <p>
          {this.renderDate(theDate, calendarStrings)}
          {" "}
          by Clarice Bouwer
          {" "}
          {this.renderTimeToRead(timeToRead)}
        </p>
        {(tags) ? <Tags className="tags" tags={tags} /> : <span />}
      </div>
    )
  }
}

export default Metadata
