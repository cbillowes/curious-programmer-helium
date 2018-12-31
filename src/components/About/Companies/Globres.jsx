import React, { Component } from "react"
import TimelineItem from "../TimelineItem"

class Globres extends Component {
  render() {
    return (
      <ul className="timeline">
        <TimelineItem
          type="work"
          company="Globres"
          duration="Jan 2006 - Sept 2006"
          title="Junior Web Developer"
        >
          <p>
            I was responsible for developing, enhancing and supporting the
            internal Global Hotel Reservation web application.
          </p>
        </TimelineItem>
      </ul>
    )
  }
}

export default Globres