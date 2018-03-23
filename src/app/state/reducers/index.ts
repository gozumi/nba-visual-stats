import { combineReducers } from 'redux'

import journeyReducer from './journey'
import systemReducer from './system'

const rootReducer = combineReducers({
  journey: journeyReducer,
  system: systemReducer
})

export default rootReducer
