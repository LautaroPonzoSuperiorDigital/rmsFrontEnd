import { DateTime } from 'luxon'

export const formatDate = (date, dateZone) =>
  date instanceof DateTime
    ? date.toLocaleString(DateTime.DATE_FULL)
    : formatDate(DateTime.fromISO(date, { zone: dateZone || 'utc' }))