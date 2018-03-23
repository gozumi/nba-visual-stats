import {
  ACKNOWLEDGE_NOTIFICATIONS_WORKER_INITIALISED,
  INITIALISE_NOTIFICATIONS,
  REQUEST_NEW_NOTIFICATION_AGGREGATION,
  SET_NOTIFICATIONS,
  SET_NOTIFICATIONS_STATUS,
  WAIT_FOR_NOTIFICATIONS_WORKER_INITIALISATION
} from 'app/state/action-types'
import { IAction } from 'app/state/store'

import DEFAULT_STATE, {
  INotificationState,
  STATUS_INITIALISING,
  STATUS_WAITING_FOR_WEB_WORKER_INITIALISATION,
  STATUS_WEB_WORKER_INITIALISED
} from './default-state'
import requestAggregation from './request-aggregation'
import setNotifiactions from './set-notifications'
import setStatus from './set-status'

export default function systemReducer (
  currentState: INotificationState = DEFAULT_STATE,
  action: IAction
) {
  const { payload } = action
  const reducerMap: any = {
    [INITIALISE_NOTIFICATIONS]: () => setStatus(currentState, STATUS_INITIALISING),
    [WAIT_FOR_NOTIFICATIONS_WORKER_INITIALISATION]:
      () => setStatus(currentState, STATUS_WAITING_FOR_WEB_WORKER_INITIALISATION),
    [ACKNOWLEDGE_NOTIFICATIONS_WORKER_INITIALISED]:
      () => setStatus(currentState, STATUS_WEB_WORKER_INITIALISED),
    [SET_NOTIFICATIONS]: () => setNotifiactions(currentState, payload),
    [REQUEST_NEW_NOTIFICATION_AGGREGATION]: () => requestAggregation(currentState),
    [SET_NOTIFICATIONS_STATUS]: () => setStatus(currentState, payload)
  }

  const reducer = reducerMap[action.type]
  return reducer ? reducer(currentState, payload) : currentState
}
