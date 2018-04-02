import { combineReducers } from 'redux'

import dailyReducer from './daily'

const rootReducer = combineReducers({
  daily: dailyReducer
})

export default rootReducer
