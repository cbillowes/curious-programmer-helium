import React, { Component } from "react"
import "./Searchbar.scss"

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      loaded: false,
      results: []
    }
    this.searchQuery = React.createRef()
  }

  generateResults = () => {
    if (this.state.error) {
      return (
        <li key="searchbar-empty" className="empty">
          Sorry, but something strange is going on. Search does not want to
          behave appropriately. Perhaps try again a little later. Drop me a line
          if it persists.
        </li>
      )
    }

    if (this.state.loaded && this.state.query !== "") {
      let numberOfResults = this.state.results.length
      if (numberOfResults === 0) {
        return (
          <li key="searchbar-empty" className="empty">
            Nothing came up. Go on, give it another shot.
          </li>
        )
      }

      let results = []
      for (let i = 0; i < numberOfResults; i++) {
        let result = this.state.results[i]
        let title = result.title
          .toString()
          .replace(/\| Curious Programmer/gi, "")
        let url = result.url
          .toString()
          .replace(/https:\/\/curiousprogrammer.io/gi, "")
        results.push(
          <li key={`searchbar-${i}`} onClick={this.props.toggle.bind(this)}>
            <a href={url}>{title}</a>
          </li>
        )
      }
      return results
    } else {
      return (
        <li key="searchbar-empty" className="empty">
          What do you feel like reading today? Search as you type, also, enter
          works too.
        </li>
      )
    }
  }

  query = (e) => {
    let query = this.searchQuery.current.value
    if (query.length > 4 || e.keyCode === 13) {
      if (query !== this.state.query) {
        this.search(query)
      }
    }

    if (query.length === 0) {
      this.setState({ query: "" })
    }
  }

  search = (query) => {
    fetch(
      `https://curiousprogrammer.tk/solr/oxygen/select?q=text:${encodeURIComponent(
        query
      )}&fl=url,title&rows=20&wt=json`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          let results = []
          if (result.response) {
            results = result.response.docs
          }
          this.setState({
            query: query,
            loaded: true,
            results: results
          })
        },
        (error) => {
          this.setState({
            loaded: true,
            error: error
          })
        }
      )
  }

  render() {
    return (
      <div className={`searchbar ${this.props.active ? "active" : ""}`}>
        <input
          ref={this.searchQuery}
          className="search-query"
          type="text"
          onKeyUp={this.query.bind(this)}
        />
        <div className="results">
          <ul>{this.generateResults()}</ul>
        </div>
      </div>
    )
  }
}

export default SearchBar
