// DEPENDENCY
import { createContext, useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

// COMPONENT
import { NewCountdownForm } from './components/NewCountdownForm'
import { Countdown } from './components/Countdown'

// STYLE
import { StartButton, HomeContainer, InterruptButton } from './styles'
import { HandPalm, Play } from 'phosphor-react'

interface ICountdown {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ICountdownContext {
  activeCountdown: ICountdown | undefined
  activeCountdownId: string | null
  amountSecondsPassed: number
  markCurrentCountdownAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

const newCountdownFormValidationSchema = z.object({
  task: z.string().min(1, 'Please type your task'),
  minutesAmount: z.number().min(5).max(60),
})

type NewCycleFormData = z.infer<typeof newCountdownFormValidationSchema>

// CONTEXT
export const CountdownContext = createContext<ICountdownContext>(
  {} as ICountdownContext,
)

export function Home() {
  const [countdowns, setCountdowns] = useState<ICountdown[]>([])
  const [activeCountdownId, setActiveCountdownId] = useState<string | null>(
    null,
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCountdownForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCountdownFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCountdownForm

  const activeCountdown = countdowns.find(
    (countdown) => countdown.id === activeCountdownId,
  )

  const task = watch('task')
  const isSubmitDisabled = !task

  const markCurrentCountdownAsFinished = () => {
    setCountdowns((countdownList) =>
      countdownList.map((countdown) => {
        if (countdown.id === activeCountdownId) {
          return { ...countdown, finishedDate: new Date() }
        }
        return countdown
      }),
    )
  }

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const handleCreateNewCountdown = (data: NewCycleFormData) => {
    const id = String(new Date().getTime())

    const newCountdown: ICountdown = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCountdowns((state) => [...state, newCountdown])
    setActiveCountdownId(id)
    setAmountSecondsPassed(0)

    // Will reset value to defaultValues inside of useForm hook
    reset()
  }

  const handleStopCountdown = () => {
    const countdownListWithInterrupted = countdowns.map((countdown) => {
      if (countdown.id === activeCountdownId) {
        return { ...countdown, interruptedDate: new Date() }
      }
      return countdown
    })

    setActiveCountdownId(null)
    setCountdowns(countdownListWithInterrupted)
  }

  return (
    <HomeContainer>
      <CountdownContext.Provider
        value={{
          activeCountdown,
          activeCountdownId,
          markCurrentCountdownAsFinished,
          amountSecondsPassed,
          setSecondsPassed,
        }}
      >
        <form id="timer" onSubmit={handleSubmit(handleCreateNewCountdown)}>
          <FormProvider {...newCountdownForm}>
            <NewCountdownForm />
          </FormProvider>
        </form>

        <Countdown />
      </CountdownContext.Provider>

      {activeCountdown ? (
        <InterruptButton type="button" onClick={handleStopCountdown}>
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
