import React from 'react'
import expressApi from '../../apis/expressApi'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AlertsPage from '../../components/pages/alertsPage/alertsPage';


const App = () => {

  const [ apiResponse, setApiResponse ] = React.useState(null)

  const apiRes = async () => {
    const res = await expressApi.get('/test')
    setApiResponse(res.data)
  }

  React.useEffect(() => {
    apiRes()
  }, [])

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <h1>React is up and running</h1>
              <h3>{apiResponse}</h3>
            </Route>
            <Route path="/alerts">
              <AlertsPage />
            </Route>
            <Route path='*'>
              <div>not found</div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>

  );
}

export default App
