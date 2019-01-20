import React, { Component } from "react"
import Layout from "../layout"
import Metadata from "../components/Metadata/Page/Metadata"
import About from "../components/About/About"
import Technologies from "../components/About/Technologies"
import Contact from "../components/About/Contact"
import Timeline from "../components/About/Timeline"
import config from "../../data/SiteConfig"

class AboutPage extends Component {
  render() {
    return (
      <Layout>
        <div className="about-container">
          <Metadata
            slug="/about"
            description={`I write code as a hobby and get paid for it. My blog. ${config.siteDescription}`} />
          <Contact />
          <About />
          <Technologies />
          <Timeline />
        </div>
      </Layout>
    )
  }
}

export default AboutPage
