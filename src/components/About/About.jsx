import React, { Component } from "react"
import "./About.scss"

function Bio() {
  return (
    <div className="profile">
      <div className="photo" />
      <h1 className="not-for-print">Hello Clarice</h1>
      <div className="for-print">
        <h1>Clarice Bouwer</h1>
        <h2>Senior Software Developer</h2>
      </div>
      <p>
        I write code. I share code. I love code. I am curious and fascinated about computers.   
      </p>
      <p>
        When I am not coding I am making people smile. I make jokes and giggle offering a warm radiant energy that people seem to love.
        This makes me happy.
      </p>
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
        <div className="read-more not-for-print">
          <div>
            <div className="button" onClick={this.toggle}>
              {this.isElaborate() ? "show less" : "read more"}
            </div>
          </div>
          <aside
            className={`elaborate ${this.isElaborate() ? "elaborated" : ""}`}
          >
            <p>
              I have an eye for aesthetically pleasing, user-friendly, developer-friendly
              products and solutions. My skills are not limited to web development. I offer 
              graphical, quality assurance and operational skills by experience.
            </p>
            <p>
              I work well within teams and offer intrinsic leadership skills and 
              encourage others to voice their opinions.
            </p>
            <p>
              I find great happiness in coding, learning and solving problems. I also like 
              to collect e-books, read, watch anime, listen to punk rock music and 
              try to push myself outside of my comfort zone.
            </p>
          </aside>
        </div>
      </div>
    )
  }
}

export default About
