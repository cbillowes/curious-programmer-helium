import React, { Component } from "react"
import TimelineItem from "../TimelineItem"
import External from "../../Link/ExternalLink"

class ITEM extends Component {
  render() {
    return (
      <ul className="timeline">
        <TimelineItem
          type="work"
          company="IT Event Management"
          companyLink="http://www.it-em.co.za"
          duration="Sept 2006 - Apr 2012"
          title="Lead Senior Web Developer"
        >
          <p>
            In 2010 I was promoted from Junior Web Developer to Lead Senior Web
            Developer.
          </p>
          <p>
            I was responsible for developing, deploying and supporting custom
            event registration websites in production and mentoring other
            software developers within our team.
          </p>
        </TimelineItem>
        <TimelineItem
          type="community"
          company="StackOverflow"
          companyLink="http://stackoverflow.com/users/849986/cbouwer?tab=profile"
          duration="Jul 2011"
          title="Joined the community"
        >
          <p>
            I joined the StackOverflow community, a renowned Q&amp;A platform for software developers.</p>
          <p>
            <External to="http://stackexchange.com/users/453154">
              <img
                src="https://stackexchange.com/users/flair/453154.png"
                width="208"
                height="58"
                alt="Profile for Clarice Bouwer on Stack Exchange, a network of free, community-driven Q&amp;A sites"
                title="Profile for Clarice Bouwer on Stack Exchange, a network of free, community-driven Q&amp;A sites"
              />
            </External>
          </p>
        </TimelineItem>
        <TimelineItem
          type="project"
          company="IT Event Management"
          companyLink="http://www.it-em.co.za"
          duration="Sept 2006 - Apr 2012"
          title="Event Registration Projects"
        >
          <ul>
            <li>Microsoft Tech-Ed Africa &amp; Middle East</li>
            <li>Microsoft Partner Summit</li>
            <li>Microsoft TechDays</li>
            <li>Microsoft DevDays</li>
            <li>Microsoft Bootcamps</li>
            <li>Microsoft ICT Best Practices</li>
            <li>Vodacom Business Partners Conference</li>
          </ul>
        </TimelineItem>
      </ul>
    )
  }
}

export default ITEM