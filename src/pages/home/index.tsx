import * as S from './styles'
import * as C from './components'
import { Heading, Text } from '@ignite-ui/react'

import previewImage from '../../assets/app-preview.png'
import Image from 'next/image'

export default function Home() {
  return (
    <S.Container>
      <S.Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <C.ClaimUsernameForm />
      </S.Hero>
      <S.Preview>
        <Image
          src={previewImage}
          alt="Calendário simbolizando aplicação em funcionamento"
          height={400}
          quality={100}
          priority
        />
      </S.Preview>
    </S.Container>
  )
}
