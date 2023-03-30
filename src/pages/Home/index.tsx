// DEPENDENCY
import { useContext } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

// COMPONENT
import { NewCountdownForm } from './components/NewCountdownForm'
import { Countdown } from './components/Countdown'

// STYLE
import { StartButton, HomeContainer, InterruptButton } from './styles'
import { HandPalm, Play } from 'phosphor-react'

// CONTEXT
import { CountdownContext } from '../../contexts/CountdownContext'

const newCountdownFormValidationSchema = z.object({
  task: z.string().min(1, 'Please type your task'),
  minutesAmount: z.number().min(5).max(60),
})

type NewCycleFormData = z.infer<typeof newCountdownFormValidationSchema>

export function Home() {
  const { activeCountdown, createNewCountdown, interruptActiveCountdown } =
    useContext(CountdownContext)

  const newCountdownForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCountdownFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch /* reset */ } = newCountdownForm

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form id="timer" onSubmit={handleSubmit(createNewCountdown)}>
        <FormProvider {...newCountdownForm}>
          <NewCountdownForm />
        </FormProvider>
      </form>

      <Countdown />

      {activeCountdown ? (
        <InterruptButton type="button" onClick={interruptActiveCountdown}>
          Interrupt
          <HandPalm size={24} weight="bold" />
        </InterruptButton>
      ) : (
        <StartButton form="timer" type="submit" disabled={isSubmitDisabled}>
          Start
          <Play size={24} weight="bold" />
        </StartButton>
      )}
    </HomeContainer>
  )
}
