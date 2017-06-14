// @flow

import React from 'react'
import Helmet from 'react-helmet'

import Header from '../header';

import {
  APP_NAME,
  APP_DESC,
} from '../../config'

const HomePage = () =>
  <div>
    <Helmet meta={[
      { name: 'description', content: APP_DESC },
      { name: 'og:title', content: APP_NAME },
    ]}/>
    <div className="jumbotron">
      <div className="container">
        <h1>{APP_NAME}</h1>
        <p className="tagline">{APP_DESC}</p>
      </div>
    </div>
  </div>

export default HomePage
