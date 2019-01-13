import React, { Component } from "react"
import Moment from "react-moment"
import Tags from "../../Tag/Tags"
import "./Metadata.scss"
const moment = require("moment")

class Metadata extends Component {
  render() {
    const { tags, date, timeToRead } = this.props
    var fromNow = moment(date).fromNow();
    const calendarStrings = {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      lastWeek: '[last] dddd',
      nextWeek: 'dddd',
      sameElse: `[${fromNow}]`
    };

    return (
      <div className="post-metadata">
        <p>
          posted
          {" "}
          <Moment date={date} calendar={calendarStrings} />
          {" "}
          on
          {" "}
          <Moment date={date} format="ddd, D MMMM YYYY" />
          {" "}
          {timeToRead && <span>(Est. {timeToRead} minute read)</span>}
        </p>
        {(tags) ? <Tags tags={tags} /> : <span />}
      </div>
    )
  }
}

export default Metadata