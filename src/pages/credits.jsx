import React, { Component } from "react";
import Link from "gatsby-link"
import Layout from "../layout";
import Metadata from "../components/Metadata/Page/Metadata";
import Credit from "../components/Credit/Credit"
import "./credits.scss"

class CreditsPage extends Component {
  render() {
    return (
      <Layout>
        <div className="credits-container container">
          <Metadata
            description="Find out more about the technologies and resources I use
            to make this site look and act the way it does."
            slug="/credits" />
          <h1>Credits</h1>
          <section>
            <h1>Hosting</h1>
            <Credit
              to="https://www.cloudafrica.net/"
              title="CloudAfrica"
            >
              My high performance cloud server which I use to power my Solr
              search.
            </Credit>
            <Credit
              to="https://netlify.com"
              title="Netlify"
            >
              An all-in-one workflow that combines global deployment, continuous
              integration, and automatic HTTPS.
            </Credit>
          </section>
          <section>
            <h1>Continuous Integration</h1>
            <Credit
              to="https://travis-ci.org"
              title="Travis CI"
            >
              Travis CI is a hosted, distributed continuous integration service
              used to build and test software projects hosted at GitHub.
            </Credit>
            <Credit
              to="https://codeclimate.com"
              title="Code Climate"
            >
              Get automated code review for test coverage, complexity,
              duplication, security, style, and more.
            </Credit>
          </section>
          <section>
            <h1>Code</h1>
            <Credit to="https://www.gatsbyjs.org/" title="gatsbyjs.org">
              Gatsby lets you build blazing fast sites with your data, whatever
              the source. Liberate your sites from legacy CMSs and fly into the
              future.
            </Credit>
            <Credit to="https://github.com/Vagr9K/gatsby-advanced-starter" title="Vagr9K/gatsby-advanced-starter">
              A high performance skeleton starter for GatsbyJS that focuses on SEO/Social features/development environment.
            </Credit>
            <Credit
              to="https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/"
              title="gatsby-remark-prismjs"
            >
              Adds syntax highlighting to code blocks in markdown files using
              PrismJS.
            </Credit>
            <Credit
              to="https://www.gatsbyjs.org/packages/gatsby-remark-embed-gist/"
              title="gatsby-remark-embed-gist"
            >
              Embed Gist snippets in markdown.
            </Credit>
            <Credit
              to="https://www.gatsbyjs.org/packages/gatsby-remark-embed-youtube/"
              title="gatsby-remark-embed-youtube"
            >
              Embed a YouTube Videos in markdown.
            </Credit>
            <Credit
              to="https://gist.github.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb"
              title="oliveratgithub/emojis.json"
            >
              Emoji-list with emojis, names, shortcodes, unicode and html entities [massive list]
            </Credit>
          </section>
          <section>
            <h1>Icons</h1>

            <h2>Menu bar</h2>

            <Credit
              to="https://www.flaticon.com/free-icon/musica-searcher_70376"
              title="Egor Rumyantsev"
            >
              Music Searcher free icon
            </Credit>

            <Credit
              to="https://www.flaticon.com/free-icon/menu_483345"
              title="Those Icons"
            >
              Menu free icon
            </Credit>
            <p>
              Icons made by <a target="_blank" rel="nofollow noopenner noreferrer" href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a target="_blank" rel="nofollow noopenner noreferrer" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a target="_blank" rel="nofollow noopenner noreferrer" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.
              <br />
              Icons made by <a target="_blank" rel="nofollow noopenner noreferrer" href="https://www.flaticon.com/authors/egor-rumyantsev" title="Egor Rumyantsev">Egor Rumyantsev</a> from <a target="_blank" rel="nofollow noopenner noreferrer" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a target="_blank" rel="nofollow noopenner noreferrer" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.</p>

            <h2>Contact me</h2>

            <p>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.</p>
            <Credit
              to="https://www.flaticon.com"
              title="flaticon"
            >
              Pixel perfect icons
            </Credit>

            <ul>
              <li><Link to="https://www.flaticon.com/free-icon/gmail_732200">Gmail</Link></li>
              <li><Link to="https://www.flaticon.com/free-icon/rss_733569">RSS</Link></li>
              <li><Link to="https://www.flaticon.com/free-icon/twitter_733579">Twitter</Link></li>
              <li><Link to="https://www.flaticon.com/free-icon/overflowing_732248">StackOverflow</Link></li>
              <li><Link to="https://www.flaticon.com/free-icon/github_733609">GitHub</Link></li>
              <li><Link to="https://www.flaticon.com/free-icon/linkedin_733561">LinkedIn</Link></li>
            </ul>
          </section>
          <section>
            <h1>Photography</h1>
            <Credit to="https://picsum.photos" title="picsum.photos">
              Lorem Ipsum... but for photos.
            </Credit>
          </section>
          <section>
            <h1>Tools</h1>
            <Credit to="https://code.visualstudio.com/" title="Microsoft Visual Studio Code">
              Visual Studio Code is an open-source and free source code editor developed
              by Microsoft for Windows, Linux and macOS. It includes support for debugging,
              embedded Git control, syntax highlighting, intelligent code completion, snippets,
              and code refactoring.
            </Credit>
            <Credit to="https://pixlr.com/editor/" title="pixlr.com">
              Pixlr is a cloud-based set of image tools and utilities, including a number of
              photo editors, a screen recorder browser extension, and a photo sharing service.
              The suite was intended for non-professionals, however the apps range from simple
              to advanced photo editing.
            </Credit>
            <Credit to="https://www.base64-image.de/" title="Base64 Image">
              Convert your images to Base64.
            </Credit>
            <Credit to="http://vectorpaint.yaks.co.nz/" title="Vector Paint">
              SVG editor: Create unique artwork with shapes, color gradients and layers. Use Vector Paint for posters, web graphics or diagrams.
            </Credit>
            <Credit to="https://editor.method.ac" title="Method draw">
              SVG editor: Edit and save images.
            </Credit>
          </section>
          <section>
            <h1>Privacy Policy</h1>
            <Credit to="https://www.iubenda.com" title="iubenda">
              Attorney-level solutions to make your websites and apps compliant
              with the law across multiple countries and legislations.
            </Credit>
          </section>
        </div>
      </Layout>
    );
  }
}

export default CreditsPage;
