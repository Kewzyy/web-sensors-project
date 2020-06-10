import React from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import { DateRangePicker } from 'react-dates'
import { useRecoilState } from 'recoil'
import { dateTimeRangeState } from 'atoms'
export const DatePicker = () => {
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)
  const [focusedInput, setFocusedInput] = React.useState(null)
  const [date, setDate] = useRecoilState(dateTimeRangeState)

  const handleDateChange = (startDate, endDate) => {
    if (startDate && endDate) {
      setStartDate(startDate)
      setEndDate(endDate)
      setDate({
        startDate: startDate,
        endDate: endDate,
      })
    }
    if (startDate) {
      setStartDate(startDate)
      setEndDate(null)
      setDate({
        startDate: startDate,
        endDate: null,
      })
    }
    if (endDate) {
      if (startDate) {
        setStartDate(startDate)
        setEndDate(endDate)
        setDate({
          startDate: startDate,
          endDate: endDate,
        })
      }
    }
  }

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId='your_unique_start_date_id'
      endDate={endDate}
      endDateId='your_unique_end_date_id'
      onDatesChange={({ startDate, endDate }) => handleDateChange(startDate, endDate)}
      focusedInput={focusedInput}
      onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      isOutsideRange={day => moment().diff(day) < 0}
      numberOfMonths={1}
    />
  )
}
