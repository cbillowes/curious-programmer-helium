import React, { Component } from "react"
import {
  TelegramShareButton,
  TelegramIcon
} from "react-share"

class Telegram extends Component {
  render() {
    const { url, size } = this.props

    return (
      <TelegramShareButton url={url}>
        <TelegramIcon round size={parseInt(size)} />
      </TelegramShareButton>
    )
  }
}

export default Telegram
