interface GetWeekDaysParams {
  short?: boolean
}

export const getWeekDays = ({ short = false }: GetWeekDaysParams = {}) => {
  const formatter = new Intl.DateTimeFormat('pt-Br', { weekday: 'long' })

  return Array.from(Array(7).keys()).map((day) => {
    const weekDay = formatter.format(new Date(Date.UTC(2021, 5, day)))

    if (short) {
      return weekDay.substring(0, 3).toUpperCase()
    }

    return weekDay.charAt(0).toUpperCase() + weekDay.slice(1)
  })
}
