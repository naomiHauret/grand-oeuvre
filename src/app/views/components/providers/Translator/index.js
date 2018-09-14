import React, { PureComponent } from "react"
import { Provider } from "app/contexts/I18n"
import dotize from "dotize"
import browserLang from "browser-lang"
import languages from "app/translations"

const translations = Object.keys(languages) // code for our langages, eg: fr, en, de, es, jp, ko ...
const url = window.location.pathname.split('/') // split url
const fallback = "en"  // fallback language if user language is not translated yet
const urlLocale = translations.filter((translation) => url.indexOf(translation) > -1)[0] // locale from url
const storageLocale = localStorage.getItem('locale')
const locale = // locale will be set from : url or localstorage or user device
  urlLocale !== undefined && urlLocale !== null
    ? urlLocale
    :  storageLocale !== null && storageLocale !== undefined && storageLocale !== ""
    ? storageLocale
    : browserLang({
      languages: translations,
      fallback,
    })

const langs = {}

// Translation magic happens here
// for a given language id + key, flatten our translation file so it's easier to work with it
translations.forEach((translation) => {
  langs[`${translation}`] = dotize.convert(languages[`${translation}`])
})


class Translator extends PureComponent {
  state = {
    locale,
    langs,
  }

  actions = {
    switchLocale: (locale) => this.setState({
      locale
    }, () => localStorage.setItem('locale', locale)), // update
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

export default Translator
