import React from "react"
import { Consumer } from "app/contexts/Routing"

const Anchor = (props) => <a {...props} /> // fallback component if none is provided

const NavLink = ({ path, component, ...props }) => { // since NavLink consumes its data from Router Provider, it has access to the go method, which will update the url in our global store
  const Link = component || Anchor
  return <Consumer>
    {({ actions }) => <Link {...props} onClick={() => actions.go(path)} />}
  </Consumer>
}

export default NavLink