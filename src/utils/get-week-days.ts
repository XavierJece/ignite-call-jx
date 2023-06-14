export const getWeekDays = () => {
  const formatter = new Intl.DateTimeFormat('pt-Br', { weekday: 'long' })

  return Array.from(Array(7).keys()).map((day) => {
    const weekDay = formatter.format(new Date(Date.UTC(2021, 5, day)))

    return weekDay.charAt(0).toUpperCase() + weekDay.slice(1)
  })
}
