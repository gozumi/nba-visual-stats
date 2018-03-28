import { DEVELOPMENT } from 'client/app/_contants'
import rootEpic from 'client/app/state/epics'
import rootReducer from 'client/app/state/reducers'
import { IJourney } from 'client/app/state/reducers/journey/default-state'
import { INotificationState } from 'client/app/state/reducers/notifications/default-state'
import { ISystemState } from 'client/app/state/reducers/system/default-state'
import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

const composeEnhancers = process.env.NODE_ENV === DEVELOPMENT ?
  ((self as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose

const epicMiddleware = createEpicMiddleware(rootEpic)
const middleware = [epicMiddleware]
const enhancers: any[] = []

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middleware),
    ...enhancers
  )
)

export default store

export interface IState {
  journey: IJourney,
  system: ISystemState,
  notifications: INotificationState
}

export interface IAction {
  type: string,
  payload?: any
}
