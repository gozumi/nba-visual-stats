import { IAggregation } from 'app/components/partition-layout/partition-layout.component'

import { INotification, INotificationState, STATUS_NOTIFICATIONS_RECEIVED } from '../default-state'

export default function setNotifiactions (
  currentState: INotificationState,
  payload: {aggregations: IAggregation, notifications: INotification[]}
): INotificationState {
  return {
    ...currentState,
    aggregations: payload.aggregations,
    list: payload.notifications,
    status: STATUS_NOTIFICATIONS_RECEIVED
  }
}
