// REDUCER
import { ActionTypes } from './actions'

// TYPE
export interface ICountdown {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CountdownsState {
  countdowns: ICountdown[]
  activeCountdownId: string | null
}

export function countdownReducer(state: CountdownsState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_COUNTDOWN:
      return {
        ...state,
        countdowns: [action.payload.newCountdown, ...state.countdowns],
        activeCountdownId: action.payload.newCountdown.id,
      }

    case ActionTypes.INTERRUPT_COUNTDOWN:
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

    case ActionTypes.MARK_CURRENT_COUNTDOWN_AS_FINISHED:
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
}
