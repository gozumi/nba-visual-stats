import { combineReducers } from 'redux'

import journeyReducer from './journey'
import notificationsReducer from './notifications'
import systemReducer from './system'

const rootReducer = combineReducers({
  journey: journeyReducer,
  notifications: notificationsReducer,
  system: systemReducer
})

export default rootReducer
