import { INotificationState } from 'client/app/state/reducers/notifications/default-state'

export default function clearCurrentTask (currentState: INotificationState): INotificationState {
  return {
    ...currentState,
    selected: null
  }
}
