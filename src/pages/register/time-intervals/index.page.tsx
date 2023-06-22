import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '~/lib/axios'
import { convertTimeStringToMinutes } from '~/utils/convert-time'
import { getWeekDays } from '~/utils/get-week-days'
import * as C from '../components'
import * as S from './styles'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z
        .object({
          weekDay: z.number().min(0).max(6),
          enabled: z.boolean(),
          startTime: z.string(),
          endTime: z.string(),
        })
        .transform((interval) => ({
          enabled: interval.enabled,
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }))
        .refine(
          ({ enabled, startTimeInMinutes, endTimeInMinutes }) => {
            if (!enabled) {
              return true
            }

            return endTimeInMinutes - startTimeInMinutes >= 60
          },
          { message: 'O intervalo mínimo é de 1 hora.' },
        ),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Selecione pelo menos um dia da semana.',
    }),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput, any, TimeIntervalsFormOutput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        {
          weekDay: 0,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },

        {
          weekDay: 1,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },

        {
          weekDay: 2,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },

        {
          weekDay: 3,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },

        {
          weekDay: 4,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 5,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 6,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })
  const weekDays = getWeekDays()

  const intervals = watch('intervals')

  async function handleSetTimeIntervals({
    intervals,
  }: TimeIntervalsFormOutput) {
    await api.post('/users/time-intervals', { intervals })

    await router.push('/register/update-profile')
  }

  return (
    <C.Container>
      <C.Header>
        <Heading as="strong">Defina sua disponibilidade</Heading>
        <Text size="xl">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </C.Header>
      <S.IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        {errors?.intervals?.message && (
          <C.FormError size="sm">{errors?.intervals?.message}</C.FormError>
        )}

        <S.IntervalsContainer>
          {fields.map((field, index) => (
            <S.IntervalItem key={field.id}>
              <div>
                <S.IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        onCheckedChange={(checked) => {
                          field.onChange(checked === true)
                        }}
                        checked={field.value}
                      />
                    )}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </S.IntervalDay>
                <S.IntervalHours>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </S.IntervalHours>
              </div>

              {Array.isArray(errors?.intervals) &&
                errors?.intervals[index]?.message && (
                  <C.FormError size="sm">
                    {errors?.intervals[index]?.message}
                  </C.FormError>
                )}
            </S.IntervalItem>
          ))}
        </S.IntervalsContainer>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </S.IntervalBox>
    </C.Container>
  )
}
