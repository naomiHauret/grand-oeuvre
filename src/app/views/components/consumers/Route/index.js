import React from "react"
import pathToRegexp from "path-to-regexp"
import { Consumer } from "app/contexts/Routing"

// Consume data from Router
// so it has access to global state, ie: URL
// return children component if the path passed as a prop to  the component matches the url

const Route = (props) => {
  const { path, children } = props
  return (
    <Consumer>
      {({ state }) => {
        const match = pathToRegexp(path)
        if(match.test(state.url)) return children
      }}
    </Consumer>
  )
}

export default Route