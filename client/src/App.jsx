import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { routes } from './config/routes'

export const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            {routes.map(route => (
              <Route {...{ ...route }} />
            ))}
            <Route path='*'>
              <div>not found</div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}
