import { INITIALISE_APPLICATION, UPDATE_TIME } from 'client/app/state/action-types'

export function initialise () {
  return {
    type: INITIALISE_APPLICATION
  }
}

export function updateTime (newTime: Date) {
  return {
    payload: newTime,
    type: UPDATE_TIME
  }
}
