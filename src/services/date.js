import { DateTime } from 'luxon'

export const formatDate = ({ date, dateZone, formatOptions }) =>
  date instanceof DateTime
    ? date.toLocaleString(formatOptions || DateTime.DATE_FULL)
    : formatDate({
      date:DateTime.fromISO(date, { zone: dateZone || 'utc' }),
      dateZone,
      formatOptions,
    })

export const createDateFromISO = (date, dateZone) => DateTime.fromISO(date, { zone: dateZone || 'utc' })