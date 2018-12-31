import React, { Component } from "react"
 
class TimelineLegend extends Component {
  render() {
    const { active } = this.props

    return (

      <ul className="legend">
        <li
          title="Education"
          className={`certificate ${active.education ? "active" : ""}`}
          onClick={this.props.onEducationClick}
        >
          <div className="icon">
            <span />
          </div>
        </li>
        <li
          title="Work"
          className={`work ${active.work ? "active" : ""}`}
          onClick={this.props.onWorkClick}
        >
          <div className="icon">
            <span />
          </div>
        </li>
        <li
          title="Podcasts"
          className={`podcast ${active.podcasts ? "active" : ""}`}
          onClick={this.props.onPodcastsClick}
        >
          <div className="icon">
            <span />
          </div>
        </li>
        <li
          title="Publishing"
          className={`book ${active.publishing ? "active" : ""}`}
          onClick={this.props.onPublishingClick}
        >
          <div className="icon">
            <span />
          </div>
        </li>
        <li
          title="Talks"
          className={`talk ${active.talks ? "active" : ""}`}
          onClick={this.props.onTalksClick}
        >
          <div className="icon">
            <span />
          </div>
        </li>
        <li
          title="Blogs"
          className={`blog ${active.blogs ? "active" : ""}`}
          onClick={this.props.onBlogsClick}
        >
          <div className="icon">
            <span />
          </div>
        </li>
        <li
          title="Projects"
          className={`project ${active.projects ? "active" : ""}`}
          onClick={this.props.onProjectsClick}
        >
          <div className="icon">
            <span />
          </div>
        </li>
        <li
          title="Community"
          className={`community ${active.community ? "active" : ""}`}
          onClick={this.props.onCommunityClick}
        >
          <div className="icon">
            <span />
          </div>
        </li>
      </ul>
    )
  }
}

export default TimelineLegend