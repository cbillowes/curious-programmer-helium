import React, { Component } from "react"
import Layout from "../layout"

class TemplatePage extends Component {
  render() {
    return (
      <Layout>
        <div>
          <blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra quis lacus vel finibus. Nam ullamcorper, eros a varius venenatis, nibh ipsum aliquam nibh, vitae lacinia dolor libero eu elit.</blockquote>
        </div>
        <ul>
          <li>Ut massa est</li>
          <li>Sit amet blandit felis</li>
          <li>Etiamt</li>
          <li>Mauris mollis ligulat</li>
        </ul>
        <h1>Lorem ipsum dolor</h1>
        <p>
          Lorem ipsum dolor sit amet, <a href="#">consectetur</a> adipiscing elit. Maecenas aliquet sem nisi, finibus gravida libero maximus non.></p>
        <h2>Phasellus commodo ex</h2>
        <p>
          Phasellus commodo ex ac pellentesque tincidunt. Praesent consequat purus quis facilisis bibendum. Vivamus quis ultricies velit, ut ultrices diam. Integer consectetur sed tortor nec dignissim. Praesent tempor augue ac augue cursus mattis. Vestibulum condimentum viverra lacus, non vestibulum orci fermentum id. Donec interdum non nulla ac scelerisque. Maecenas condimentum velit semper elit molestie venenatis. Vivamus cursus sapien at tellus porta ultricies.
        </p>
        <h3>Vivamus in risus finibus</h3>
        <p>
          <a href="#">Vivamus in risus finibus</a> erat vulputate fringilla eget eu velit. <br />
          Nunc viverra dignissim mattis. Etiam rhoncus est metus, a rutrum risus dignissim vel. Suspendisse potenti. Fusce condimentum lectus nec nulla bibendum, eget viverra nunc commodo. Phasellus orci risus, imperdiet sit amet tincidunt nec, imperdiet in ligula. Nam tincidunt arcu purus, porta fermentum quam convallis quis. Suspendisse mattis, nisi non hendrerit luctus, arcu libero pharetra eros, vitae dictum dolor erat sed eros. Morbi aliquam sapien in enim aliquet tristique. Sed mattis neque eu leo fringilla, vel pulvinar augue hendrerit. Quisque eu dolor sed erat sagittis pretium.
        </p>
        <h4>Sit amet blandit</h4>
        <p>
          Sit amet blandit felis ornare. Suspendisse potenti. Praesent non ex efficitur, venenatis sem at, eleifend orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus lobortis sodales augue. Nullam eget libero ligula. Nulla hendrerit lectus nisl, at accumsan sem sagittis a.
        </p>
        <hr />
        <h5>Ut massa est</h5>
        <p>Ut massa est, lacinia eu vehicula nec, condimentum a massa.</p>
        <h6>Curabitur at pharetra</h6>
        <p>Curabitur at pharetra ex. Fusce a purus dolor. </p>
        <h7>Mauris mollis ligula</h7>
        <p>Mauris mollis ligula <a href="https://google.com">Google</a> sit amet tortor semper.</p>
        <table>
          <tr>
            <th>Lorem ipsum</th>
            <th>Cras rutrum</th>
            <th>Ut massa est</th>
          </tr>
          <tr>
            <td>consectetur adipiscing elit</td>
            <td>aecenas condimentum</td>
            <td>onec interdum non nulla ac</td>
          </tr>
          <tr>
            <td>accumsan rutrum</td>
            <td><a href="#">lorem</a> consectetur adipiscing elit</td>
            <td>uisque eu dolor</td>
          </tr>
          <tr>
            <td>unc viverra dignissim mattis</td>
            <td>uisque eu dolor <a href="#">rutrum</a></td>
            <td>aecenas condimentum</td>
          </tr>
          <tr>
            <td>onec interdum non nulla ac</td>
            <td>unc viverra dignissim mattis</td>
            <td>consectetur adipiscing elit</td>
          </tr>
        </table>
      </Layout>
    )
  }
}

export default TemplatePage
