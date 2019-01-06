import React, { Component } from "react"
import External from "../Link/ExternalLink"

class Overview extends Component {
  render() {
    return (
      <div id="overview">
        <h1>Privacy Policy</h1>
        <p><b>curiousprogrammer.io</b> collects some Personal Data from its Users.</p>

        <h2>Owner and Data Controller</h2>
        <p>Clarice Bouwer</p>
        <p>
          <b>Owner contact email:</b> <a href="mailto:curiousprogrammer.io@gmail.com">curiousprogrammer.io@gmail.com</a>
        </p>
        <div className="overview">
          <h2>Quick Overview</h2>
          <p>
            Want to skim through the document quickly? Why not have a look at the 
            {" "}
            <External to="https://www.iubenda.com/private/privacy-policy/621007?preview=true&amp;ifr=true&amp;height=800&amp;an=no">
              simplified Privacy Policy</External>.</p>
          <p>
            Personal Data collected for the following purposes and using the
            following services:</p>
          <ul>
            <li>
              <h2>Analytics</h2>
              <b>Google Analytics</b>
              <p>Personal Data: Cookies and Usage Data</p>
            </li>
            <li>
              <h2>Content commenting</h2>
              <b>Disqus</b>
              <p>
                Personal Data: Cookies, Usage Data and various types of Data
                as specified in the privacy policy of the service</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Overview