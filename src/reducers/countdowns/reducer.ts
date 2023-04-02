// DEPENDENCY
import { produce } from 'immer'

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
      return produce(state, (draft) => {
        draft.countdowns.push(action.payload.newCountdown)
        draft.activeCountdownId = action.payload.newCountdown.id
      })

    case ActionTypes.INTERRUPT_COUNTDOWN: {
      const currentCountdownIndex = state.countdowns.findIndex(
        (countdown) => countdown.id === state.activeCountdownId,
      )

      if (currentCountdownIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCountdownId = null
        draft.countdowns[currentCountdownIndex].interruptedDate = new Date()
      })
    }

    case ActionTypes.MARK_CURRENT_COUNTDOWN_AS_FINISHED: {
      const currentCountdownIndex = state.countdowns.findIndex(
        (countdown) => countdown.id === state.activeCountdownId,
      )

      if (currentCountdownIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCountdownId = null
        draft.countdowns[currentCountdownIndex].finishedDate = new Date()
      })
    }

    default:
      return state
  }
}
