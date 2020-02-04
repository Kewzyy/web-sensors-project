import React from 'react'
import expressApi from '../../apis/expressApi'

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
      <h1>React is up and running</h1>
      <h3>{apiResponse}</h3>
    </div>
  )
}

export default App
