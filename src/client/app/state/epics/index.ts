import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'

import { INITIALISE_APPLICATION, REQUEST_NEW_NOTIFICATION_AGGREGATION } from 'client/app/state/action-types'
import { IAction, IState } from 'client/app/state/store'
import { Store } from 'redux'
import { ActionsObservable, combineEpics, Epic } from 'redux-observable'

import {
  getNotificationsFromWebWorker,
  requestAggregationChangeFromWebWorker
} from './web-worker-instances/notifiactions'

const rootEpic: Epic<IAction, IState> = combineEpics(
  getNotifications,
  changeNotificationsAggregation
)

export default rootEpic

/**
 * This function returns an observable that sends a message to the notifications
 * web worker requesting the notifications.
 * @param action$ This function is concerned with ACKNOWLEDGE_NOTIFICATIONS_WORKER_INITIALISED
 * actoins
 */
function getNotifications (action$: ActionsObservable<IAction>) {
  return action$
    .filter((action) => action.type === INITIALISE_APPLICATION)
    .map(getNotificationsFromWebWorker)
}

/**
 * This function returns an observable that sends a message to the notifications
 * web worker requesting the notifications.
 * @param action$ This function is concerned with ACKNOWLEDGE_NOTIFICATIONS_WORKER_INITIALISED
 * actoins
 */
function changeNotificationsAggregation (action$: ActionsObservable<IAction>, store: Store<IState>) {
  return action$
    .filter((action) => action.type === REQUEST_NEW_NOTIFICATION_AGGREGATION)
    .map((action) => {
      const { list } = store.getState().notifications
      return requestAggregationChangeFromWebWorker(action.payload, list)
    })
}
