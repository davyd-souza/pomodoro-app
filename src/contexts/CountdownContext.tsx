// DEPENDENCY
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import dayjs from 'dayjs'

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
  const [countdownsState, dispatch] = useReducer(
    countdownReducer,
    {
      countdowns: [],
      activeCountdownId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@pomodoro-app:countdowns-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  const { countdowns, activeCountdownId } = countdownsState
  const activeCountdown = countdowns.find(
    (countdown) => countdown.id === activeCountdownId,
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCountdown) {
      const differenceInSeconds = dayjs(new Date()).diff(
        new Date(activeCountdown.startDate),
        'seconds',
      )

      return differenceInSeconds
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(countdownsState)

    localStorage.setItem('@pomodoro-app:countdowns-state-1.0.0', stateJSON)
  }, [countdownsState])

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
