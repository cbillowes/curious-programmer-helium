import React, { Component } from "react"
import Link from "gatsby-link"
import External from "../../Link/ExternalLink"
import TimelineItem from "../TimelineItem"

class DStv extends Component {
  render() {
    return (
      <ul className="timeline">
        <TimelineItem
          type="work"
          company="DStv Digital Media"
          duration="Jun 2016 - 30 June 2018"
          title="Senior Software Developer"
        >
          <p>
            Appointed to work permanently, I continued my work in a{" "}
            <span className="tag">SCRUM</span> team working on the{" "}
            <span className="tag">Video On Demand</span> offering including{" "}
            <span className="tag">Live Streaming</span> integrating with
            multiple microservice touch points. I showed exemplary leadership
            qualities and worked well within the team.
          </p>
        </TimelineItem>
        <TimelineItem
          type="podcast"
          company="ZA Dev Chat"
          duration="28 Aug 2017"
          title="67 - The Imposter Within with Clarice Bouwer"
          titleLink="https://zadevchat.io/67"
        >
          <p>
            I shared my views on imposter syndrome, what it is and how to
            overcome it. I also covered other issues around the often overlooked
            topics of mental well-being.
          </p>
        </TimelineItem>
        <TimelineItem
          type="talk"
          company="Rubyfuza 2017 Conference"
          companyLink="http://www.rubyfuza.org/"
          duration="3 February 2017"
          title="The Imposter Within"
        >
          <p>
            I spoke about the limiting opportunities and affected growth effects
            of Imposter Syndrome and how I was personally affected.
          </p>
          <p>
            <span>
              <External to="https://twitter.com/i/moments/830378337516322816">
                Twitter moments
              </External>
            </span>
            { " " } &bull; { " " }
            <span>
              <Link to="/slides/rubyfuza-2017-the-imposter-within.pdf">
                Slides
              </Link>
            </span>
            { " " } &bull; { " " }
            <span>
              <Link to="/blog/rubyfuza-2017-conference/">Content</Link>
            </span>
            { " " } &bull; { " " }
            <span>
              <External to="https://www.youtube.com/watch?v=fkgAc0DY4s8">
                Video
              </External>
            </span>
          </p>
        </TimelineItem>
        <TimelineItem
          type="podcast"
          company="Developer On Fire"
          companyLink="http://developeronfire.com/podcast/episode-202-clarice-bouwer-leaving-comfort-behind"
          duration="23 January 2017"
          title="Episode 202 | Clarice Bouwer - Leaving Comfort Behind"
          titleLink="http://developeronfire.com/podcast/episode-202-clarice-bouwer-leaving-comfort-behind"
        >
          <p>
            I spoke with Dave Rael about collboration, empathy, fear, and being
            an imposter.
          </p>
        </TimelineItem>
        <TimelineItem
          type="book"
          company="Corporate Programmer"
          duration="13 November 2016"
          title="The Imposter Within"
          titleLink="/blog/the-imposter-within/"
        >
          <p>
            This post sparked some interesting conversation on{" "}
            <External to="https://www.reddit.com/r/programming/comments/5cpaty/ive_had_a_lot_of_problems_with_imposter_syndrome/">
              Reddit
            </External>
            , which accumulated 6,734 unique page views and over 200 votes
            within a week of posting.
          </p>
        </TimelineItem>
        <TimelineItem
          type="book"
          company="A List Apart"
          companyLink="http://alistapart.com/author/clarice-bouwer"
          duration="2 August 2016"
          title="Finding Opportunities in the Mistakes We Make"
          companyLink="http://alistapart.com/article/finding-opportunities-in-the-mistakes-we-make"
        >
          <p>
            Collaborating with Rose Weisburd, I wrote about burn out and falling
            behind in technology. I learned a lot in my career and shared how I
            found opportunities in the mistakes I made.
          </p>
        </TimelineItem>
        <TimelineItem
          type="talk"
          company="Driven Unconference"
          companyLink="https://twitter.com/hashtag/drivenci"
          duration="30 - 31 July 2016"
          title="Mindfulness"
        >
          <p>
            I spoke about how the power of{" "}
            <span className="tag">mindfulness</span> can be incorporated in
            everyday use and be applied to the workplace to calm the busy mind
            and be still and productive in an environmental rush.
          </p>
        </TimelineItem>
        <TimelineItem
          type="talk"
          company="Jozi-JUG"
          duration="4 June 2016"
          title="Java 9 and Women in tech Unconference"
        >
          <p>
            My first talk ,{" "}
            <Link to="/blog/branding-your-identity">
              Branding your Identity
            </Link>
            , shared how software developers can create a name for themselves in
            the development community.
          </p>
        </TimelineItem>
        <TimelineItem
          type="blog"
          company="Corporate Programmer"
          duration="28 Apr 2016"
          title="A new blog"
        >
          <p>
            I started a blog using <span className="tag">Jekyll</span> a static
            site generateor. The goal was to help other software developers who
            are joining or are working within a corporate environment by sharing
            my personal experiences.
          </p>
        </TimelineItem>
        <TimelineItem
          type="work"
          company="Britehouse"
          companyLink="http://www.britehouse.co.za/"
          duration="Apr 2014 - May 2016"
          title="Senior Software Developer"
        >
          <p>
            Britehouse, formerly known as 3Fifteen, placed me at DStv Digital
            Media. I joined an <span className="tag">Agile</span>{" "}
            <span className="tag">SCRUM</span> team focusing on production based
            voting solutions such as Idols, Big Brother and Survivor. I later
            joined the DStv Now team.
          </p>
        </TimelineItem>
        <TimelineItem
          type="project"
          company="Britehouse"
          duration="Apr 2016 - May 2018"
          title="DStv Now"
        >
          <p>
            A live streaming and video on-demand digital entertainment solution
            offering DStv's Catch Up and Live TV offerings.
          </p>
        </TimelineItem>
        <TimelineItem
          type="project"
          company="Britehouse"
          duration="Apr 2014 - May 2016"
          title="DStv Digital Media Original Productions"
        >
          <ul>
            <li>Idols South Africa</li>
            <li>Big Brother Mzansi &amp; Angola</li>
            <li>Channel-O Music Video Awards</li>
            <li>Africa Magic Viewers Choice Awards</li>
          </ul>
        </TimelineItem>
      </ul>
    )
  }
}

export default DStv