import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { ArrowRight, Check } from 'phosphor-react'
import * as C from '../components'
import * as S from './styles'
import { useRouter } from 'next/router'

export default function ConnectCalendar() {
  const router = useRouter()
  const session = useSession()

  const hasAuthError = !!router.query.error
  const isSingedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNextStep() {
    await router.push('/register/time-intervals')
  }

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
        {hasAuthError && (
          <C.FormError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </C.FormError>
        )}

        <S.ConnectItem>
          <Text>Google Calendar {isSingedIn}</Text>

          {isSingedIn && !hasAuthError ? (
            <Button variant="secondary" size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </S.ConnectItem>

        <Button
          type="submit"
          disabled={!isSingedIn || hasAuthError}
          onClick={handleNextStep}
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </S.ConnectBox>
    </C.Container>
  )
}
