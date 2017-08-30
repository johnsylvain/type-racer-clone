// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'

import { APP_NAME } from './config'
import Nav from './components/nav'
import HomePage from './components/page/home'
// import HelloPage from './components/page/hello'
// import HelloAsyncPage from './components/page/hello-async'
import NotFoundPage from './components/page/not-found'
import RacePage from './components/page/race'

import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_PAGE_ASYNC_ROUTE,
} from './routes'

const App = () =>
  <div>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME}/>
    <Nav />
    <Switch>
      <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage/>} />
      <Route path={RACE_ROUTE} render={() => <RacePage/>} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>

export default App
