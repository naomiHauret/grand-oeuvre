import React, { PureComponent } from "react"
import { Consumer } from "app/contexts/I18n"
import dotize from "dotize"

const Translate = (props) => {
  const { id } = props
  return <Consumer>
    {({ state }) => {

        if(state.langs[state.locale][id] !== undefined && state.langs[state.locale][id] !== null) return state.langs[state.locale][id]
        return `${state.locale}.${id}`
      }
    }
    </Consumer>
}

export default Translate
