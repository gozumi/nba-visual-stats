import { requestAggregation } from 'client/app/state/action-creators/notifications'
import { IAction, IState } from 'client/app/state/store'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import PartitionLayout, { IPartitionLayoutProps } from 'client/app/components/partition-layout/partition-layout.component'

export default connect(mapStateToProps, mapDispatchToProps)(NotificationLayoutContainer)

/**
 *
 * @param props
 */
function NotificationLayoutContainer (props: IPartitionLayoutProps) {
  return (
    <PartitionLayout {...props} />
  )
}

/**
 * Pulls in the aggregations and notification list from the redux state.
 * @param state The redux state
 */
function mapStateToProps (state: IState) {
  const { aggregations } = state.notifications
  return {
    aggregations
  }
}

function mapDispatchToProps (dispatch: Dispatch<IAction>) {
  return {
    handleAggregationChange: (order: string[]) => {
      dispatch(requestAggregation(order))
    }
  }
}