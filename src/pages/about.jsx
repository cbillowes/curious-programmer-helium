import React, { Component } from "react"
import Layout from "../layout"
import Metadata from "../components/Metadata/Page/Metadata"
import About from "../components/About/About"
import Technologies from "../components/About/Technologies"
import Contact from "../components/About/Contact"
import Timeline from "../components/About/Timeline"

class AboutPage extends Component {
  render() {
    return (
      <Layout>
        <div className="about-container">
          <Metadata
            slug="/about"
            description={`I write code as a hobby and get paid for it. Trending now is Clojure and Gatsby. My blog's my pet project & notebook. It is a curious place for a curious mind. Learn more about me.`} />
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
