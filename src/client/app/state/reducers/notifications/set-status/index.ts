import { INotificationState } from '../default-state'

export default function setStatus (
  currenState: INotificationState,
  newStatus: string
): INotificationState {
  return {
    ...currenState,
    status: newStatus
  }
}
