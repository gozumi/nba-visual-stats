import { IAggregation } from 'client/app/components/partition-layout/partition-layout.component'
import { IPlayerStats } from 'server/routes/api/player-stats/_interfaces'

import { IPlayerStatsState, STATUS_PLAYER_STATS_RECEIVED } from '../default-state'

/**
 *
 * @param currentState
 * @param payload
 */
export default function setPlayerStats (
  currentState: IPlayerStatsState,
  payload: any
): IPlayerStatsState {
  const { aggregations, list, playerStats } = payload
  return {
    ...currentState,
    aggregations,
    list,
    playerStats,
    status: STATUS_PLAYER_STATS_RECEIVED
  }
}
