import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import * as C from '../components'
import * as S from './styles'

export default function TimeIntervals() {
  return (
    <C.Container>
      <C.Header>
        <Heading as="strong">Quase lá</Heading>
        <Text size="xl">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </C.Header>
      <S.IntervalBox as="form">
        <S.IntervalsContainer>
          <S.IntervalItem>
            <S.IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </S.IntervalDay>
            <S.IntervalHours>
              <TextInput size="sm" type="time" step={60} />
              <TextInput size="sm" type="time" step={60} />
            </S.IntervalHours>
          </S.IntervalItem>

          <S.IntervalItem>
            <S.IntervalDay>
              <Checkbox />
              <Text>Terça-feira</Text>
            </S.IntervalDay>
            <S.IntervalHours>
              <TextInput size="sm" type="time" step={60} />
              <TextInput size="sm" type="time" step={60} />
            </S.IntervalHours>
          </S.IntervalItem>
        </S.IntervalsContainer>

        <Button type="submit" disabled={false}>
          Próximo passo
          <ArrowRight />
        </Button>
      </S.IntervalBox>
    </C.Container>
  )
}
