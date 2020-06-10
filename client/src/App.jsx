import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { routes } from './config/routes'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './config/theme'
import { RecoilRoot } from 'recoil'

export const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </RecoilRoot>
  )
}
