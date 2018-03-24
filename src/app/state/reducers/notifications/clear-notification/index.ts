import { INotificationState } from 'app/state/reducers/notifications/default-state'

export default function clearCurrentTask (currentState: INotificationState): INotificationState {
  return {
    ...currentState,
    selected: null
  }
}
