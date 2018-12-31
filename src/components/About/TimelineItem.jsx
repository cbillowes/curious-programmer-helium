import React, { Component } from "react"
import Link from "gatsby-link"
import External from "../Link/ExternalLink"

class TimelineItem extends Component {
  getCompanyHeading = (company, companyLink) => {
    if (companyLink) {
      if (companyLink.startsWith("http")) {
        return <External to={companyLink}>{company}</External>
      } else {
        return <Link to={companyLink}>{company}</Link>
      }
    }
    return company
  }

  render() {
    const {
      type,
      company,
      companyLink,
      duration,
      title
    } = this.props
    return (
      <li className={`item ${type}`}>
        <section>
          <div className="meta">
            <h2>{this.getCompanyHeading(company, companyLink)}</h2>
            <span>{duration}</span>
          </div>
          <div className="icon">
            <span />
          </div>
          <div className="description">
            <h3>{title}</h3>
            {this.props.children}
          </div>
        </section>
      </li>
    )
  }
}

export default TimelineItem