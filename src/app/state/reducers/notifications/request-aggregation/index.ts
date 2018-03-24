import { INotificationState, STATUS_AWAITING_AGGREGATION_CHANGE } from 'app/state/reducers/notifications/default-state'

export default function requestAggregation (currentState: INotificationState): INotificationState {
  return {
    ...currentState,
    status: STATUS_AWAITING_AGGREGATION_CHANGE
  }
}
