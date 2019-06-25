export const datetimeFilter = (value) => {
  if (value.length === 0) {
    return value
  }
  const date = new Date(value)
  function doubleDigitValue(value) {
    return `00${value}`.slice(-2)
  }
  const dateString = `${doubleDigitValue(date.getDate())}-${doubleDigitValue(date.getMonth() + 1)}-${date.getFullYear()}`
  const timeString = `${doubleDigitValue(date.getHours())}:${doubleDigitValue(date.getMinutes())}`
  return `${dateString} ${timeString}`
}
