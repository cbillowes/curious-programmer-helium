import React, { Component } from "react"
import Logo from "./Logo/Logo"
import Icons from "./Icons/Icons"
import Menubar from "../Menubar/Menubar"
import Searchbar from "../Search/Searchbar"
import "./Navigation.scss"

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      search: false
    }
  }

  toggleSearch = () => {
    this.setState({
      search: !this.state.search,
      menu: false
    })
  }

  toggleMenu = () => {
    this.setState({
      menu: !this.state.menu,
      search: false
    })
  }

  collapseAll = () => {
    this.setState({
      menu: false,
      search: false
    })
  }

  render() {
    return (
      <div className="navigation">
        <Logo onLogoClick={this.collapseAll} />
        <Icons
          onMenuClick={{ toggle: this.toggleMenu, active: this.state.menu }}
          onSearchClick={{ toggle: this.toggleSearch, active: this.state.search }}
        />
        <Menubar
          toggle={this.toggleMenu}
          active={this.state.menu} />
        {/* <Searchbar
          toggle={this.toggleSearch}
          active={this.state.search} /> */}
      </div>
    )
  }
}

export default Navigation
