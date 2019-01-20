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
          posted
          {" "}
          <Moment date={theDate} calendar={calendarStrings} />
          {" "}
          on
          {" "}
          {this.renderMoment(theDate)}
          {" "}
          {timeToRead && <span>(Est. {timeToRead} minute read)</span>}
        </p>
        {(tags) ? <Tags tags={tags} /> : <span />}
      </div>
    )
  }
}

export default Metadata