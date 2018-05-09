import { CHANGE_AGGREGATION, GET_PLAYER_STATS as WW_GET_PLAYER_STATS } from 'client/web-workers/_message-types'
import { Dispatch, Store } from 'react-redux'
import PlayerStatsWorker = require('worker-loader!web-workers/player-stats')

import { GET_PLAYER_STATS, REQUEST_NEW_PLAYER_STATS_AGGREGATION } from '../../action-types'
import { IState } from '../../reducers/_interfaces'
import { IAction } from '../../store/_interfaces'
import messageHandler from '../message-handler'

const playerStatsWorker: Worker = new PlayerStatsWorker()
playerStatsWorker.onmessage = messageHandler

export const requestPlayerStats = (_store: Store<IState>) => (next: Dispatch<IAction>) => (action: IAction) => {
  if (action.type === GET_PLAYER_STATS) {
    playerStatsWorker.postMessage({
      type: WW_GET_PLAYER_STATS
    })
  }

  return next(action)
}

export const requestAggregationChangeFromWebWorker =
  (_store: Store<IState>) => (next: Dispatch<IAction>) => (action: IAction) => {
    if (action.type === REQUEST_NEW_PLAYER_STATS_AGGREGATION) {
      playerStatsWorker.postMessage({
        payload: action.payload,
        type: CHANGE_AGGREGATION
      })
    }

    next(action)
  }
