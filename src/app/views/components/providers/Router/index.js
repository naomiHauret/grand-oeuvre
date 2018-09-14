import React, { PureComponent } from 'react'
import history from "browser-history"
import { Provider } from "app/contexts/Routing"

// Children of router will have access to current url, stored in the app state
// and a go method, to update the state

class Router extends PureComponent {
  state = {
    url: window.location.pathname,
  }

  actions = {
    go: (url) => this.setState((state) => ({ ...state, url }), () => history(url)), // update current url
  }

  componentDidMount() {
    history((e, url) => this.setState((state) => ({ ...state, url })))
  }

  render() {
    const { children } = this.props
    return (
      <Provider
        value={{
          state: this.state,
          actions: this.actions,
        }}
      >
        {children}
      </Provider>
    )
  }
}

export default Router