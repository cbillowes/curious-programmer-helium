import React, { Component } from "react"
import Layout from "../layout"
import Metadata from "../components/Metadata/Page/Metadata"
import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy"
import External from "../components/Link/ExternalLink"
import "./privacy-policy.scss"

class PrivacyPolicyPage extends Component {
  render() {
    return (
      <Layout>
        <div className="privacy-policy-container container">
          <Metadata slug="/privacy-policy" />
          <PrivacyPolicy />
        </div>
      </Layout>
    )
  }
}

export default PrivacyPolicyPage
