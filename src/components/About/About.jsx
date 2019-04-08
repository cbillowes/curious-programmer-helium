import React, { Component } from "react"
import "./About.scss"

function Bio() {
  return (
    <div className="profile">
      <div className="photo" />
      <h1 className="web">Hello Clarice</h1>
      <div className="print">
        <img src="/images/profile.jpg" />
        <h1>Clarice Bouwer</h1>
        <h2>Senior Fullstack Software Engineer</h2>
        <h3 class="email">clarice@bouwer.dev &middot; curiousprogrammer.dev</h3>
      </div>
      <div>
        <p>
          I write code. I share code. I love code. I am curious and fascinated
          by computers. I drive to write developer-friendly code for user-friendly
          systems. I relish in learning new things and solving problems,
          collecting e-books, reading, watching Anime, listening to punk rock music,
          blogging and pushing myself outside my comfort zone.
        </p>
      </div>
    </div>
  )
}

class About extends Component {
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

  render() {
    return (
      <div className="about">
        <Bio />
        <div className="read-more">
          <div>
            <div className="button web" onClick={this.toggle}>
              {this.isElaborate() ? "show less" : "read more"}
            </div>
          </div>
          <aside
            className={`elaborate ${this.isElaborate() ? "elaborated" : "print"}`}
          >
            <p>
              I have two diplomas and would like to finish my degree. I have
              appeared on two podcasts, published three articles, spoken at
              three events, worked on two blogs, developed software for well
              known Microsoft and South African production brands, and am
              fairly active in the South African software development community.
            </p>
            <p>
              I am a fullstack web engineer currently specializing in Clojure,
              ClojureScript, Datomic, DevOps and virtualization using Linux systems.
              I come from a Microsoft background and have developed in C# and
              Microsoft SQL. I enjoy working with HTML, CSS and JavaScript.
              I easily integrate with well documented libraries, frameworks and
              service APIs. My favourite include Gatsby, Twitter Bootstrap and
              React.
            </p>
            <p>
              I have an affinity for UX and design working in Adobe Photoshop
              and Adobe Illustrator. I make things pretty.
            </p>
            <p>
              I have worked in Agile teams using Kanban and SCRUM. I am
              an intrinsic leader and offer my intellect to mentoring others. I introduce
              a radiant energy and am empathetic.
            </p>
            <p>
              My favourite editors are Microsoft Visual Studio, IntelliJ IDEA and
              Visual Studio Code. My first computer was an Intel i386 and I enjoy
              building computers.
            </p>
          </aside>
        </div>
      </div>
    )
  }
}

export default About
