

export const getFormattedDateTime = (date) => {
  let day = null
  let month = null
  let year = null

  let hours = null
  let minutes = null

  if (date !== null && typeof date !== 'undefined') {
    var inputDate = new Date(Date.parse(date))
    day = inputDate.getDate()
    month = inputDate.getMonth() + 1
    year = inputDate.getFullYear()

    hours = inputDate.getHours()
    minutes = inputDate.getMinutes()
  }
  return `${month !== null && month < 10 ? `0${month}` : `${month}`}/${day !== null && day < 10 ? `0${day}` : `${day}`}/${year}
          ${hours !== null && hours < 10 ? `0${hours}` : `${hours}`}:${minutes !== null && minutes < 10 ? `0${minutes}` : `${minutes}`}`
}

