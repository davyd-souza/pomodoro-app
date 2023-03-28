// DEPENDENCY
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// STYLE
import {
  ButtonStyled,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  InputStyled,
  Separator,
} from './styles'
import { Play } from 'phosphor-react'

const newCountdownFormValidationSchema = z.object({
  task: z.string().min(1, 'Please type your task'),
  minutesAmount: z.number().min(5).max(60),
})

type NewCycleFormData = z.infer<typeof newCountdownFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCountdownFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const task = watch('task')
  const isSubmitDisabled = !task

  const handleCreateNewCountdown = (data: NewCycleFormData) => {
    console.log(data)

    // Will reset value to defaultValues inside of useForm hook
    reset()
  }

  return (
    <HomeContainer>
      <FormContainer
        id="timer"
        onSubmit={handleSubmit(handleCreateNewCountdown)}
      >
        <label htmlFor="task">I&apos;m going to work on</label>
        <InputStyled
          type="text"
          id="task"
          placeholder="Give your task a name"
          autoComplete="on"
          {...register('task')}
        />

        <label htmlFor="minutesAmount">for</label>
        <InputStyled
          type="number"
          id="minutesAmount"
          placeholder="00"
          step={5}
          max={60}
          min={5}
          {...register('minutesAmount', { valueAsNumber: true })}
        />

        <span>minutes.</span>
      </FormContainer>

      <CountdownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountdownContainer>

      <ButtonStyled form="timer" type="submit" disabled={isSubmitDisabled}>
        Start
        <Play size={24} weight="bold" />
      </ButtonStyled>
    </HomeContainer>
  )
}
