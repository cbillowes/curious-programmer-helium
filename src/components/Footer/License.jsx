import React, { Component } from "react"
import Link from "gatsby-link"
import External from "../Link/ExternalLink"
import License from "../License/License"
import "./License.scss"

class LicenseFooter extends Component {
  render() {
    return (
      <div className="license-footer">
        <div className="grand">
          <License />
          {" "}
          <p>
            Also, there is a
            {" "}
            <Link to="/license">License</Link>{" for the code "}
            and it's probably a good idea to read the
            {" "}
            <Link to="/privacy-policy">Privacy Policy</Link>
            .
          </p>
        </div>
        <div className="baby">
          <Link to="/privacy-policy">Privacy Policy</Link> &bull; { " " }
          <Link to="/license">License</Link> &bull; { " " }
          <External to="https://github.com/cbillowes/curious-programmer-helium">GitHub</External>
        </div>
      </div>
    )
  }
}

export default LicenseFooter
