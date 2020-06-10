import { atom } from 'recoil'

export const dateTimeRangeState = atom({
  key: 'dateTimeRangeState',
  default: {
    startDate: null,
    endDate: null,
  },
})
