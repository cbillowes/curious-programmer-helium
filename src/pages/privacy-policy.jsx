import React, { Component } from "react"
import Layout from "../layout"
import Metadata from "../components/Metadata/Page/Metadata"
import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy"
import "./privacy-policy.scss"

class PrivacyPolicyPage extends Component {
  render() {
    return (
      <Layout>
        <div className="privacy-policy-container container">
          <Metadata
          description="This blog collects some personal data from its users. It is
          important to know what and how it is used."
          slug="/privacy-policy" />
          <PrivacyPolicy />
        </div>
      </Layout>
    )
  }
}

export default PrivacyPolicyPage
