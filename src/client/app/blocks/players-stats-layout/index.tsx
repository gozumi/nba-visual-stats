import PartitionLayout, {
  IAggregation,
  IPartitionLayoutProps
} from 'client/app/components/partition-layout/partition-layout.component'
import { requestAggregation } from 'client/app/state/action-creators/player-stats'
import { IAction, IState } from 'client/app/state/store'
import { FREE_THROWS, THREE_POINTERS, TWO_POINTERS } from 'client/web-workers/player-stats/data-mapper'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

export default connect(mapStateToProps, mapDispatchToProps)(playerShotsLayoutContainer)

export interface IPlayersStatsLayoutProps {
  aggregations: IAggregation
  aggregationChangeHandler: (order: string[]) => void
  className?: string
}

/**
 *
 * @param props
 */
function playerShotsLayoutContainer (props: IPlayersStatsLayoutProps) {
  const componentProps: IPartitionLayoutProps = {
    ...props,
    nodeHtmlHandler: calculateText
  }
  return (
    <PartitionLayout {...componentProps} />
  )
}

/**
 * Pulls in the aggregations and notification list from the redux state.
 * @param state The redux state
 */
function mapStateToProps (state: IState) {
  const { aggregations } = state.playerStats
  return {
    aggregations
  }
}

/**
 *
 * @param dispatch
 */
function mapDispatchToProps (dispatch: Dispatch<IAction>) {
  return {
    aggregationChangeHandler: (order: string[]) => {
      dispatch(requestAggregation(order))
    }
  }
}

function calculateText (d: any) {
  const { accumulatedPoints, title } = d.data
  const threePointersTotal = d.data[THREE_POINTERS]
  const twoPointersTotal = d.data[TWO_POINTERS]
  const freeThrowsTotal = d.data[FREE_THROWS]
  const line1 = `<li>${title}</li>`
  const line2 = `<li>total points: ${accumulatedPoints}</li>`
  const line3 = `<li>3 pointers: ${threePointersTotal}</li>`
  const line4 = `<li>2 pointers: ${twoPointersTotal}</li>`
  const line5 = `<li>Free throws: ${freeThrowsTotal}</li>`
  return line1 + line2 + line3 + line4 + line5
}
