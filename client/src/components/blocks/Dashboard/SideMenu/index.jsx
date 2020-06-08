import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { LocationCity, Home, BarChart, Notifications, Http } from '@material-ui/icons'

export const ListItems = () => {
  const itemConfig = [
    { name: 'Sākums', icon: <Home /> },
    { name: 'Grafiki', icon: <BarChart /> },
    { name: 'Ēkas plāns', icon: <LocationCity /> },
    { name: 'Brīdinājumi', icon: <Notifications /> },
    { name: 'Real-time dati', icon: <Http /> },
  ]

  return (
    <div>
      {itemConfig.map(item => {
        return (
          <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        )
      })}
    </div>
  )
}
