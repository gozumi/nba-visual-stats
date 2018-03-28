import { INotificationState } from '../default-state'

export default function setCurrentTask (currentState: INotificationState, payload: number): INotificationState {
  return {
    ...currentState,
    selected: payload
  }
}
