import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'

import { IAction, IState } from 'client/app/state/store'
import { Store } from 'redux'
import { ActionsObservable, combineEpics, Epic } from 'redux-observable'

import { GET_DAILY, REQUEST_NEW_DAILY_AGGREGATION } from '../action-types'
import { getDailyFromWebWorker, requestAggregationChangeFromWebWorker } from './web-worker-instances/daily'

const rootEpic: Epic<IAction, IState> = combineEpics(
  getDaily,
  changeDailyAggregation
)

export default rootEpic

function getDaily (action$: ActionsObservable<IAction>) {
  return action$
    .filter((action) => action.type === GET_DAILY)
    .map(getDailyFromWebWorker)
}

function changeDailyAggregation (action$: ActionsObservable<IAction>, store: Store<IState>) {
  return action$
    .filter((action) => action.type === REQUEST_NEW_DAILY_AGGREGATION)
    .map((action) => {
      const { data } = store.getState().daily
      return requestAggregationChangeFromWebWorker(action.payload)
    })
}
