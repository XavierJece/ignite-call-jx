import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '~/lib/axios'
import * as S from './styles'
import { AxiosError } from 'axios'

const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisar tem pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hífens.',
    })
    .transform((value) => value.toLowerCase()),

  name: z
    .string()
    .min(3, { message: 'O nome precisar tem pelo menos 3 letras.' }),
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const router = useRouter()
  const [errorApi, setErrorApi] = useState<string | null>(null)

  useEffect(() => {
    const { username } = router.query

    if (username) {
      setValue('username', String(username))
    }
  }, [router.query, router.query.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        setErrorApi('Username já registrado.')
        return
      }
      console.log(error)
    }
  }

  return (
    <S.Container>
      <S.Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text size="xl">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </S.Header>
      <S.Form as="form" onSubmit={handleSubmit(handleRegister)}>
        {errorApi && <S.FormError>{errorApi}</S.FormError>}

        <label>
          <Text>Nome de usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />

          {errors.username && (
            <S.FormError size="sm">{errors.username.message}</S.FormError>
          )}
        </label>

        <label>
          <Text>Nome completo</Text>
          <TextInput placeholder="Seu nome completo" {...register('name')} />

          {errors.name && (
            <S.FormError size="sm">{errors.name.message}</S.FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </S.Form>
    </S.Container>
  )
}
