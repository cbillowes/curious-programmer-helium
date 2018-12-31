import $ from "jquery"
import React, { Component } from "react"
import Legend from "./TimelineLegend"
import CloudAfrica from "./Companies/CloudAfrica"
import DStv from "./Companies/DStv"
import Remata from "./Companies/Remata"
import ITEM from "./Companies/ITEM"
import Globres from "./Companies/Globres"
import Education from "./Companies/Education"
import "./Timeline.scss"

function toggle(className) {
  let activeElements = $(`.timeline .legend .${className}.active`).length
  let element = $(`.timeline .item.${className}`)
  if (activeElements > 0) {
    element.show()
  } else {
    element.hide()
  }
}

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      education: false,
      work: false,
      podcasts: false,
      publishing: false,
      talks: false,
      blogs: false,
      projects: false,
      community: false
    }
  }

  componentDidUpdate() {
    toggle("certificate")
    toggle("work")
    toggle("podcast")
    toggle("book")
    toggle("talk")
    toggle("blog")
    toggle("project")
    toggle("community")
  }

  render() {
    return (
      <section className="timeline" onLoad={() => this.setState({work: true})}>
        <Legend
          active={this.state}
          onEducationClick={() => this.setState({ education: !this.state.education })}
          onWorkClick={() => this.setState({ work: !this.state.work })}
          onPodcastsClick={() => this.setState({ podcasts: !this.state.podcasts })}
          onPublishingClick={() => this.setState({ publishing: !this.state.publishing })}
          onTalksClick={() => this.setState({ talks: !this.state.talks })}
          onBlogsClick={() => this.setState({ blogs: !this.state.blogs })}
          onProjectsClick={() => this.setState({ projects: !this.state.projects })}
          onCommunityClick={() => this.setState({ community: !this.state.community })}
        />
        <div className="items">
          <CloudAfrica />
          <DStv />
          <Remata />
          <ITEM />
          <Globres />
          <Education />
        </div>
      </section>
    )
  }
}

export default Timeline