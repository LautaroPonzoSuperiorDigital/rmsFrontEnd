import moment from 'moment'

// const defaultDateFormat = 'DD [de] MMMM [de] YYYY'

export const formatDate = (date, dateFormat = null) => {
  if (typeof date === 'string') {
    return formatDate(new Date(date), dateFormat)
  }

  return moment(date).format()
}