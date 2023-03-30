// DEPENDENCY
import { createContext, ReactNode, useState } from 'react'

// TYPE
interface CountdownContextProviderProps {
  children: ReactNode
}

interface CreateNewCountdownData {
  task: string
  minutesAmount: number
}

interface ICountdown {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ICountdownContext {
  countdowns: ICountdown[]
  activeCountdown: ICountdown | undefined
  activeCountdownId: string | null
  amountSecondsPassed: number
  markCurrentCountdownAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCountdown: (data: CreateNewCountdownData) => void
  interruptActiveCountdown: () => void
}

// CONTEXT
export const CountdownContext = createContext<ICountdownContext>(
  {} as ICountdownContext,
)

export function CountdownContextProvider({
  children,
}: CountdownContextProviderProps) {
  const [countdowns, setCountdowns] = useState<ICountdown[]>([])
  const [activeCountdownId, setActiveCountdownId] = useState<string | null>(
    null,
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCountdown = countdowns.find(
    (countdown) => countdown.id === activeCountdownId,
  )

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

  const createNewCountdown = (data: CreateNewCountdownData) => {
    const id = String(new Date().getTime())

    const newCountdown: ICountdown = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCountdowns((state) => [newCountdown, ...state])
    setActiveCountdownId(id)
    setAmountSecondsPassed(0)
  }

  const interruptActiveCountdown = () => {
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
    <CountdownContext.Provider
      value={{
        countdowns,
        activeCountdown,
        activeCountdownId,
        markCurrentCountdownAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCountdown,
        interruptActiveCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
