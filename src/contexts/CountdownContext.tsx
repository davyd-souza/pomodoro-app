// DEPENDENCY
import { createContext, ReactNode, useReducer, useState } from 'react'

// REDUCER
import { countdownReducer, ICountdown } from '../reducers/countdowns/reducer'
import {
  addNewCycleAction,
  interruptCountdownAction,
  markCurrentCountdownAsFinishedAction,
} from '../reducers/countdowns/actions'

// TYPE
interface CountdownContextProviderProps {
  children: ReactNode
}

interface CreateNewCountdownData {
  task: string
  minutesAmount: number
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
  const [countdownsState, dispatch] = useReducer(countdownReducer, {
    countdowns: [],
    activeCountdownId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { countdowns, activeCountdownId } = countdownsState

  const activeCountdown = countdowns.find(
    (countdown) => countdown.id === activeCountdownId,
  )

  const markCurrentCountdownAsFinished = () => {
    dispatch(markCurrentCountdownAsFinishedAction())
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

    dispatch(addNewCycleAction(newCountdown))
    setAmountSecondsPassed(0)
  }

  const interruptActiveCountdown = () => {
    dispatch(interruptCountdownAction())
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
