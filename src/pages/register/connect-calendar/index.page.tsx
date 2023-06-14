import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useState } from 'react'
import * as C from '../components'
import * as S from './styles'

export default function Register() {
  const [errorApi] = useState<string | null>(null)

  // async function handleRegister(data) {}

  return (
    <C.Container>
      <C.Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text size="xl">
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </C.Header>
      <S.ConnectBox>
        {errorApi && <C.FormError>{errorApi}</C.FormError>}

        <S.ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary" size="sm">
            Conectar
            <ArrowRight />
          </Button>
        </S.ConnectItem>

        <Button type="submit" disabled={false}>
          Próximo passo
          <ArrowRight />
        </Button>
      </S.ConnectBox>
    </C.Container>
  )
}
