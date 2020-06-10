import React from 'react'
import { VictoryHistogram, VictoryChart } from 'victory'
import { mockApiData } from 'constants/mock-data'

export const Chart = () => {
  return (
    <VictoryChart>
      <VictoryHistogram data={mockApiData} y='value' x='date'></VictoryHistogram>
    </VictoryChart>
  )
}
