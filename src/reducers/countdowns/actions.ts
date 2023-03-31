// TYPE
import { ICountdown } from './reducer'

/* eslint-disable no-unused-vars */
export enum ActionTypes {
  ADD_NEW_COUNTDOWN = 'ADD_NEW_COUNTDOWN',
  INTERRUPT_COUNTDOWN = 'INTERRUPT_COUNTDOWN',
  MARK_CURRENT_COUNTDOWN_AS_FINISHED = 'MARK_CURRENT_COUNTDOWN_AS_FINISHED',
}
/* eslint-enable */

export function addNewCycleAction(newCountdown: ICountdown) {
  return {
    type: ActionTypes.ADD_NEW_COUNTDOWN,
    payload: {
      newCountdown,
    },
  }
}

export function markCurrentCountdownAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_COUNTDOWN_AS_FINISHED,
  }
}

export function interruptCountdownAction() {
  return {
    type: ActionTypes.INTERRUPT_COUNTDOWN,
  }
}
