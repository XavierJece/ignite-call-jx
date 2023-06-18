import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { api } from '~/lib/axios'
import { getWeekDays } from '../../utils/get-week-days'
import * as S from './styles'

interface CalendarProps {
  disabledNavigationPreviousMonth?: boolean
  disabledNavigationNextMonth?: boolean
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
    isToday?: boolean
  }>
}

interface BlockedDates {
  blockedWeekDays: number[]
}

type CalendarWeeks = CalendarWeek[]

export function Calendar({
  disabledNavigationPreviousMonth = false,
  disabledNavigationNextMonth = false,
  selectedDate,
  onDateSelected,
}: CalendarProps) {
  const [firstDayCurrentMonth, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const router = useRouter()

  function handlePreviousMonth() {
    const previousMonth = firstDayCurrentMonth.subtract(1, 'month')

    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = firstDayCurrentMonth.add(1, 'month')

    setCurrentDate(nextMonth)
  }

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = firstDayCurrentMonth.format('MMMM')
  const currentYear = firstDayCurrentMonth.format('YYYY')

  const username = String(router.query.username)

  const { data: blockedDates } = useQuery<BlockedDates>(
    [
      'blocked-dates',
      firstDayCurrentMonth.get('year'),
      firstDayCurrentMonth.get('month'),
    ],
    async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: firstDayCurrentMonth.get('year'),
          month: firstDayCurrentMonth.get('month'),
        },
      })

      return response.data
    },
  )

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: firstDayCurrentMonth.daysInMonth(),
    }).map((_, i) => {
      return firstDayCurrentMonth.set('date', i + 1)
    })

    const firstWeekDay = firstDayCurrentMonth.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return firstDayCurrentMonth.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = firstDayCurrentMonth.set(
      'date',
      firstDayCurrentMonth.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          isToday: date.isSame(dayjs(), 'day'),
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDates?.blockedWeekDays.includes(date.get('day')),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [firstDayCurrentMonth, blockedDates])

  console.log(calendarWeeks)

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </S.CalendarTitle>

        <S.CalendarActions>
          <button
            onClick={handlePreviousMonth}
            disabled={disabledNavigationPreviousMonth}
            title="Previous month"
          >
            <CaretLeft />
          </button>
          <button
            onClick={handleNextMonth}
            disabled={disabledNavigationNextMonth}
            title="Next month"
          >
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
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled, isToday }) => {
                  return (
                    <td key={date.toString()}>
                      <S.CalendarDay
                        isToday={isToday}
                        disabled={disabled}
                        onClick={() => onDateSelected(date.toDate())}
                      >
                        {date.get('date')}
                      </S.CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </S.CalendarBody>
    </S.CalendarContainer>
  )
}
