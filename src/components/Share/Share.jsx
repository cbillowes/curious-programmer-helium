import React, { Component } from "react"
import Facebook from "./Facebook"
import Twitter from "./Twitter"
import Reddit from "./Reddit"
import GooglePlus from "./GooglePlus"
import LinkedIn from "./LinkedIn"
import Telegram from "./Telegram"
import WhatsApp from "./WhatsApp"
import config from "../../../data/SiteConfig"
import "./Share.scss"

class SocialLinks extends Component {
  render() {
    const { slug, title, description } = this.props
    const url = `${config.siteUrl}${config.pathPrefix}${slug}`
    const size = 50

    return (
      <div className="social-media">
        <Facebook url={url} title={title} description={description} size={size} />
        <Twitter url={url} title={title} size={size} />
        <Reddit url={url} title={title} size={size} />
        <GooglePlus url={url} title={title} size={size} />
        <LinkedIn url={url} title={title} description={description} size={size} />
        <Telegram url={url} size={size} />
        <WhatsApp url={url} title={title} size={size} />
      </div>
    )
  }
}

export default SocialLinks
