import React, { Component } from "react"
import Moment from "react-moment"
import Tags from "../../Tag/Tags"
import "./Metadata.scss"

class Metadata extends Component {
  render() {
    const { tags, date, timeToRead} = this.props

    return (
      <div className="post-metadata">
        <p>
          posted
          {" "}
          <Moment date={date} fromNow />
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