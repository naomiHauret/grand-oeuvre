import React, {Fragment, PureComponent} from 'react'
import Translate from "views/components/consumers/Translate"

const Home = (props) => {
  return <Fragment>
    <h1>
      Grand Oeuvre
      <div>
        <Translate id="a_state_management_sandbox" />
      </div>
    </h1>
    <SearchBox />
  </Fragment>
}

class SearchBox extends PureComponent {
  state = {
    query: null,
    successfullQuery: null,
    searching: false,
    results: null,
    error: null,
  }
  handleInput = (e) => {
    e.preventDefault()
    this.setState({
      query: e.currentTarget.value.trim(),
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ searching: true }, this.fetchQuery())
  }
  fetchQuery = () => {
    fetch(`https://api.chucknorris.io/jokes/search?query=${this.state.query}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.result === null) {
          this.setState({
            error: true,
            searching: false,
            successfullQuery: null,
            results: null,
          })
        }
        this.setState({
          searching: false,
          results: json.result,
          successfullQuery: this.state.query,
          error: false,
        })
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          searching: false,
          successfullQuery: null,
          results: null,
        })
      })
  }
  renderSearchComponent = () => (
    <div>
      Searching facts for {this.state.query}
      ...
    </div>
  )

  render() {
    const { successfullQuery, query, searching, results, error } = this.state
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onInput={this.handleInput} />
          <button type="submit">Go</button>
          {searching === true && this.renderSearchComponent()}
        </form>
        {error === true && <span>{error}</span>}
        {searching === false &&
          results !== null && (
            <Fragment>
              {results.length} results for "{successfullQuery}"
              <div>
                {results.map((result) => (
                  <div>
                    <img src={result.icon_url} />
                    <p>{result.value}</p>
                  </div>
                ))}
              </div>
            </Fragment>
          )}
      </Fragment>
    )
  }
}

export default Home