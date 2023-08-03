const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const formatPrice = (price) => {
  return formatter.format(price).replace(/^(\D+)/, '$1 ').replace(/\s+/, ' ')
}