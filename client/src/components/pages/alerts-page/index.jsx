import React from 'react'
import { AlertsPage as AP } from './AlertsPage'
import { Dashboard } from '../../blocks/Dashboard'

export const AlertsPage = () => {
  return (
    <Dashboard title='Brīdinājumu pārskats'>
      <AP />
    </Dashboard>
  )
}
