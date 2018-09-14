import React from 'react'
import { Consumer } from "app/contexts/I18n"

const ToggleLanguage = ({ locale, ...props}) => {
  return <Consumer>
    {({ actions }) => <button {...props} onClick={() => actions.switchLocale(locale)} />}
  </Consumer>
}

export default ToggleLanguage
