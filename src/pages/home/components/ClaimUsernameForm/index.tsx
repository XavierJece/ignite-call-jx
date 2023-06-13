import { Button, TextInput } from '@ignite-ui/react'
import * as S from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const claimUsernameSchema = z.object({
  username: z.string(),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameSchema>

export const ClaimUsernameForm = () => {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <S.Container as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuario"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </S.Container>
  )
}
