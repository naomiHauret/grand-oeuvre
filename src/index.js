import React, { Fragment } from "react"
import {render} from "react-dom"
import Router from "views/components/providers/Router"
import Translator from "views/components/providers/Translator"
import Route from "views/components/consumers/Route"
import { Consumer } from "app/contexts/Routing"
import i18nRoutes from "app/routes"
import ToggleLanguage from "app/views/components/consumers/ToggleLanguage"
import NavLink from "app/views/components/consumers/NavLink"

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector("#app")
  app !== null && render(<Router>
        <Translator>
          <ToggleLanguage locale="fr">
            FR
          </ToggleLanguage>
          <ToggleLanguage locale="en">
            EN
          </ToggleLanguage>
          <NavLink path="/">Home</NavLink>

          <Consumer>
            {({ state, action }) => {
              return <Fragment>
                {i18nRoutes.map(route => <Route path={`${route.path}`}
                  >{route.children}
                </Route>
                  )
                }
              </Fragment>
            }}
          </Consumer>
        </Translator>
      </Router>, document.querySelector("#app"))
})

