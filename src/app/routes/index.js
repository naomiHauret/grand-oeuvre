import { locales } from "app/translations"
import loadable from "loadable-components"
import React from 'react'

const Loading = () => <div>Loading...</div>
const Home = loadable(() => import("./../views/pages/Home"), {
  LoadingComponent: Loading,
})

const routes = [
  {
    path: "/",
    children: <Home />
  },
]
const i18nRoutes = [...routes]

locales.forEach(locale => routes.forEach((route, i) => i18nRoutes.push({
  path: `/${locale}${route.path}`,
  children: route.children
}))
)

export default i18nRoutes