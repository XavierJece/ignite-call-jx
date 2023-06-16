import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '~/utils/get-week-days'
import * as S from './styles'
import { useState } from 'react'
import dayjs from 'dayjs'

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')

    setCurrentDate(nextMonth)
  }

  const shortWeekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </S.CalendarTitle>

        <S.CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </S.CalendarActions>
      </S.CalendarHeader>

      <S.CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <S.CalendarDay>1</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay disabled>2</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>3</S.CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <S.CalendarDay>4</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay disabled>5</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>6</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay disabled>7</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>8</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>9</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>10</S.CalendarDay>
            </td>
          </tr>
        </tbody>
      </S.CalendarBody>
    </S.CalendarContainer>
  )
}
