import React, { Component } from "react"
import {
  WhatsappShareButton,
  WhatsappIcon
} from "react-share"

class WhatsApp extends Component {
  render() {
    const { url, title, size } = this.props

    return (
      <div className="social-links">
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon round size={size} />
        </WhatsappShareButton>
      </div>
    )
  }
}

export default WhatsApp
