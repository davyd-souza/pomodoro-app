// DEPENDENCY
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import dayjs from 'dayjs'

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

interface Countdown {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export function Home() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([])
  const [countdownId, setCountdownId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCountdownFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const task = watch('task')
  const isSubmitDisabled = !task

  const activeCountdown = countdowns.find(
    (countdown) => countdown.id === countdownId,
  )

  useEffect(() => {
    if (activeCountdown) {
      setInterval(() => {
        setAmountSecondsPassed((state) =>
          dayjs(new Date()).diff(activeCountdown.startDate, 'seconds'),
        )
      }, 1000)
    }
  }, [activeCountdown])

  const handleCreateNewCountdown = (data: NewCycleFormData) => {
    const id = String(new Date().getTime())

    const newCountdown: Countdown = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCountdowns((state) => [...state, newCountdown])
    setCountdownId(id)

    // Will reset value to defaultValues inside of useForm hook
    reset()
  }

  // Get total of seconds typed user set
  const totalSeconds = activeCountdown ? activeCountdown.minutesAmount * 60 : 0

  // Amount of seconds passed after countdown is created
  const currentSeconds = activeCountdown
    ? totalSeconds - amountSecondsPassed
    : 0

  // Get amount of minutes and seconds left
  const minutesLeft = Math.floor(currentSeconds / 60)
  const secondsLeft = currentSeconds % 60

  // Get amount of minutes and seconds left but with a 0 at the start if it doens't have one
  const minutes = String(minutesLeft).padStart(2, '0')
  const seconds = String(secondsLeft).padStart(2, '0')

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
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>

      <ButtonStyled form="timer" type="submit" disabled={isSubmitDisabled}>
        Start
        <Play size={24} weight="bold" />
      </ButtonStyled>
    </HomeContainer>
  )
}
