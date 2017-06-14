// @flow

import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_PAGE_ASYNC_ROUTE,
  NOT_FOUND_DEMO_PAGE_ROUTE,
  RACE_ROUTE,
} from '../routes'

const Nav = () => (
  <nav>
    <ul>
      {[
        { route: HOME_PAGE_ROUTE, label: 'Home' },
        { route: RACE_ROUTE, label: 'Race' },
      ].map(link => (
        <li key={link.route}>
          <NavLink to={link.route} activeStyle={{ color: 'limegreen' }}>{link.label}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
)

export default Nav
