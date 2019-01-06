import React, { Component } from "react"
import External from "../Link/ExternalLink"

class DetailedInformation extends Component {
  render() {
    return (
      <div id="detailed-information">
        <h2>Detailed information on the processing of Personal Data</h2>
        <p>
          Personal Data is collected for the following purposes and using
          the following services:</p>
        <ul>
          <li>
            <h3>Analytics</h3>
            <p>
              The services contained in this section enable the Owner to
              monitor and analyze web traffic and can be used to keep track
              of User behavior.</p>
            <h4>Google Analytics (Google Inc.)</h4>
            <p>
              Google Analytics is a web analysis service provided by Google
              Inc. (“Google”). Google utilizes the Data collected to track
              and examine the use of this Application, to prepare reports on
              its activities and share them with other Google services.<br />
              Google may use the Data collected to contextualize and
              personalize the ads of its own advertising network.</p>
            <p>Personal Data collected: Cookies and Usage Data.</p>
            <p>
              Place of processing: US{" – "}
              <External to="https://www.google.com/intl/en/policies/privacy/">
                Privacy Policy</External>
              {" – "}
              <External to="https://tools.google.com/dlpage/gaoptout?hl=en">
                Opt Out</External>
            </p>
          </li>
          <li>
            <h3>Content Commenting</h3>
            <p>
              Content commenting services allow Users to make and publish
              their comments on the contents of this Application.<br />
              Depending on the settings chosen by the Owner, Users may also
              leave anonymous comments. If there is an email address among
              the Personal Data provided by the User, it may be used to send
              notifications of comments on the same content. Users are
              responsible for the content of their own comments.<br />
              If a content commenting service provided by third
               parties is installed, it may still collect web traffic data
               for the pages where the comment service is installed, even
               when Users do not use the content commenting service.</p>
            <h4>Disqus (Disqus)</h4>
            <p>
              Disqus is a content commenting service provided by Big Heads
              Labs Inc.</p>
            <p>
              Personal Data collected: Cookies, Usage Data and various types
              of Data as specified in the privacy policy of the service.</p>
            <p>
              Place of processing: US{" – "}
              <External to="https://help.disqus.com/customer/portal/articles/466259-privacy-policy">
                Privacy Policy</External>
              {" – "}
              <External to="https://help.disqus.com/customer/portal/articles/1657951">
                Opt Out</External>
            </p>
          </li>
        </ul>
      </div>
    )
  }
}

export default DetailedInformation