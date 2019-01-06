import React, { Component } from "react"
import Link from "gatsby-link"
import TimelineItem from "../TimelineItem"

class CloudAfrica extends Component {
  render() {
    return (
      <ul className="timeline">
        <TimelineItem
          type="community"
          company="Agile Africa 2018"
          duration="Jan - Oct 2018"
          title="Organizer"
        >
          <p>
            As one of the organizers I was responsible for delegate bags,
            facilitating speakers and guiding delegates to the respective
            speaker rooms. In the event that something did not go according to
            plan, quick thinking and immediate action was required.
          </p>
        </TimelineItem>
        <TimelineItem
          type="book"
          company="OfferZen"
          companyLink="https://www.offerzen.com/blog/debugging-with-chrome-devtools-quick-front-end-fixes"
          duration="20 July 2018"
          title="Debugging with Chrome DevTools: Quick Front End Fixes"
          titleLink="https://www.offerzen.com/blog/debugging-with-chrome-devtools-quick-front-end-fixes"
        >
          <p>
            I wrote my first article for OfferZen working closely with Anne
            Gonschorek. I focused on how
            {" "}
            <span className="tag">Chrome DevTools</span> can help fix
            {" "}
            <span className="tag">JavaScript</span>,
            <span className="tag">HTML</span> &amp;
            {" "}
            <span className="tag">CSS</span> bugs fast.
          </p>
        </TimelineItem>
        <TimelineItem
          type="work"
          company="CloudAfrica"
          companyLink="http://cloudafrica.net"
          duration="1 July 2018 (Current)"
          title="Senior Systems and Web/Fullstack Developer"
        >
          <p>
            I moved to <span className="tag">Clojure</span> and
            {" "}
            <span className="tag">Datomic</span> working in a
            {" "}
            <span className="tag">DevOps</span> powered virtualization
            environment.
          </p>
        </TimelineItem>
        <TimelineItem
          type="blog"
          company="Curious Programmer"
          companyLink="https://curiousprogrammer.io"
          duration="26 June 2018"
          title="A new blog"
        >
          <p>
            I left corporate and changed my brand. I created my new blog using
            <span className="tag">Gatsby</span>, a
            {" "}
            <span className="tag">React</span> based static site generator and
            {" "}
            <Link to="/credits">other</Link> technologies.
          </p>
        </TimelineItem>
      </ul>
    )
  }
}

export default CloudAfrica