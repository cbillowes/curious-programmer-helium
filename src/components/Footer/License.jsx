import React, { Component } from "react"
import License from "../License/License"
import Link from "gatsby-link"
import "./License.scss"

class LicenseFooter extends Component {
  render() {
    return (
      <div className="license-footer">
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
    )
  }
}

export default LicenseFooter
