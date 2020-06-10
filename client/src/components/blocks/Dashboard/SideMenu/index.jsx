import React from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { 
  LocationCity,
  Home,
  BarChart,
  Notifications,
  // Http
} from '@material-ui/icons'
import {
  CHARTS_PATH,
  FLOOR_PLAN_PATH,
  LANDING_PATH,
  ALERTS_PATH,
  // REAL_TIME_DATA_PATH,
} from '../../../../constants'
import { useHistory } from 'react-router-dom'

export const ListItems = () => {
  const itemConfig = [
    { name: 'Sākums', icon: <Home />, path: LANDING_PATH },
    { name: 'Grafiki', icon: <BarChart />, path: CHARTS_PATH },
    { name: 'Ēkas plāns', icon: <LocationCity />, path: FLOOR_PLAN_PATH },
    { name: 'Brīdinājumi', icon: <Notifications />, path: ALERTS_PATH },
    // { name: 'Real-time dati', icon: <Http />, path: REAL_TIME_DATA_PATH },
  ]
  const history = useHistory()
  return (
    <div>
      {itemConfig.map(item => {
        return (
          <ListItem
            key={`${item.name}-key`}
            button
            onClick={() => {
              console.log(`Pressed ${item.name}`)
              history.push(item.path)
            }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        )
      })}
    </div>
  )
}
