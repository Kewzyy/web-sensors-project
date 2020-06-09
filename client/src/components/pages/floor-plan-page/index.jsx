import React from 'react'
import { FloorPlansPage as FP } from './FloorPlansPage'
import { Dashboard } from '../../blocks/Dashboard'

export const FloorPlansPage = () => {
  return (
    <Dashboard title='Ēkas plāns un sensori'>
      <FP />
    </Dashboard>
  )
}