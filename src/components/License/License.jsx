import React, { Component } from "react"
import ExternalLink from "../Link/ExternalLink"
import config from "../../../data/SiteConfig"
import "./License.scss"

class License extends Component {
  render() {
    const dct = { "xmlns:dct": "http://purl.org/dc/terms/" }
    const cc = { "xmlns:cc": "http://creativecommons.org/ns#" }

    return (
      <span className="license">
        <ExternalLink
          rel="license"
          to="http://creativecommons.org/licenses/by-sa/4.0/"
          className="license-icon"
        >
          <img
            alt="Creative Commons License"
            src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
            title="Creative Commons Attribution-ShareAlike 4.0 International License"
          />
        </ExternalLink>
        <p>
          <span {...dct} property="dct:title">
            {" "}
            {config.siteTitle} content
            {" "}
          </span>
          {" "}
          by
          {" "}
          <ExternalLink
            {...cc}
            to={config.siteUrl}
            property="cc:attributionName"
            rel="cc:attributionURL"
          >
            {config.userName}
          </ExternalLink>
          {" "}
          is licensed under a
          {" "}
          <ExternalLink
            rel="license"
            to="http://creativecommons.org/licenses/by-sa/4.0/"
          >
            Creative Commons Attribution-ShareAlike 4.0 International License
          </ExternalLink>
          .
        </p>
      </span>
    )
  }
}

export default License
