// DEPENDENCY
import { createContext, ReactNode, useReducer, useState } from 'react'

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

interface CountdownsState {
  countdowns: ICountdown[]
  activeCountdownId: string | null
}

// CONTEXT
export const CountdownContext = createContext<ICountdownContext>(
  {} as ICountdownContext,
)

export function CountdownContextProvider({
  children,
}: CountdownContextProviderProps) {
  const [countdownsState, dispatch] = useReducer(
    (state: CountdownsState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_COUNTDOWN':
          return {
            ...state,
            countdowns: [action.payload.newCountdown, ...state.countdowns],
            activeCountdownId: action.payload.newCountdown.id,
          }

        case 'INTERRUPT_COUNTDOWN':
          return {
            ...state,
            countdowns: state.countdowns.map((countdown) => {
              if (countdown.id === state.activeCountdownId) {
                return { ...countdown, interruptedDate: new Date() }
              }
              return countdown
            }),
            activeCountdownId: null,
          }

        case 'MARK_CURRENT_COUNTDOWN_AS_FINISHED':
          return {
            ...state,
            countdowns: state.countdowns.map((countdown) => {
              if (countdown.id === state.activeCountdownId) {
                return { ...countdown, finishedDate: new Date() }
              }
              return countdown
            }),
            activeCountdownId: null,
          }

        default:
          return state
      }
    },
    {
      countdowns: [],
      activeCountdownId: null,
    },
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { countdowns, activeCountdownId } = countdownsState

  const activeCountdown = countdowns.find(
    (countdown) => countdown.id === activeCountdownId,
  )

  const markCurrentCountdownAsFinished = () => {
    dispatch({
      type: 'MARK_CURRENT_COUNTDOWN_AS_FINISHED',
      payload: {
        activeCountdownId,
      },
    })
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

    dispatch({
      type: 'ADD_NEW_COUNTDOWN',
      payload: {
        newCountdown,
      },
    })
    setAmountSecondsPassed(0)
  }

  const interruptActiveCountdown = () => {
    dispatch({
      type: 'INTERRUPT_COUNTDOWN',
      payload: {},
    })
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
