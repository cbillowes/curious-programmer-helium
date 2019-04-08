import React, { Component } from "react"
import TimelineItem from "../TimelineItem"

class Remata extends Component {
  render() {
    return (
      <ul className="timeline remata">
        <TimelineItem
          type="work"
          company="Remata Communications"
          companyLink="http://www.remata.co.za/"
          duration="Jul 2012 - Mar 2014"
          title="Senior Software Developer"
        >
          <p>
            In the Cross Media Solutions department, I was responsible for the
            development and maintenance of automated processes and custom
            development integration with <span className="tag">XMPie</span> for
            on-demand <span className="tag">variable data printing</span>
            {" "}
            solutions.
          </p>
        </TimelineItem>
        <TimelineItem
          type="community"
          company="DeveloperUG"
          companyLink="https://www.meetup.com/DeveloperUG/"
          duration="10 Jul 2012"
          title="Developer User Group"
        >
          <p>
            Started attending the Developer User Group monthly meetups at
            Microsoft.
          </p>
        </TimelineItem>
        <TimelineItem
          type="project"
          company="Remata Communications"
          duration="Apr 2014 - May 2016"
          title="Remata Cross Media Solutions Projects"
        >
          <ul>
            <li>Platinum Life variable data print automation service</li>
            <li>Nashua Mobile business prospective variable data print</li>
            <li>Photo2Print automation</li>
            <li>Herbex Daily SMS</li>
          </ul>
        </TimelineItem>
      </ul>
    )
  }
}

export default Remata
