import React from 'react'
import { DataOverviewPage as DOP } from './data-overview-page'
import { Dashboard } from '../../blocks/Dashboard'

export const DataOverviewPage = () => {
  return (
    <Dashboard title='Datu pārskats'>
      <DOP />
    </Dashboard>
  )
}
