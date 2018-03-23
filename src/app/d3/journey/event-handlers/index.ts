import { IWaypoint } from 'app/state/reducers/journey/default-state'

import { journeyDataMapper } from '../data-mappers'

export function handleBubbleClick (
  waypoint: IWaypoint,
  nodes: any[]
) {
  waypoint.options.map(journeyDataMapper)
    .filter((n, idx, a) => !nodes.find((element) => element.id === n.id))
    .forEach((n) => {
      nodes.push(n)
    })

  return nodes
}
