import { IPlayerStatsListItem } from 'server/routes/api/player-stats/_interfaces'

interface IAccumulator {
  title: string
  type: string
  accumulatedPoints: number
  points?: number
  children: IAccumulator[]
}

export const POINTS_BREAKDOWN = 'points-breakdown'

/**
 * Maps notifications received by the notifications API endpoint to
 * the notification format needed by this application.
 * @param notifications The notifications to map
 */
export function aggregateData (
  playerStats: IPlayerStatsListItem[],
  order: string[]
) {
  const accumulator: IAccumulator = {
    accumulatedPoints: 0,
    children: [],
    title: 'All',
    type: ''
  }

  for (const player of playerStats) {
    addPlayerStatsToTree(player, accumulator, order)
  }

  return accumulator
}

function addPlayerStatsToTree (player: IPlayerStatsListItem, acc: IAccumulator, order: string[], points?: number) {
  if (order.length === 0) {
    return
  }

  const apt = order[0]
  let ap

  if (apt === POINTS_BREAKDOWN) {
    const { pointsBreakDown } = player
    for (const pointType in pointsBreakDown) {
      if (pointsBreakDown.hasOwnProperty(pointType)) {
        const bdPoints = player.pointsBreakDown[pointType]
        if (bdPoints > 0) {
          ap = _addPlayerStatsToTree(player, acc, pointType, true)
          ap.points = order.length === 1 ? bdPoints : undefined
          ap.accumulatedPoints = ap.accumulatedPoints + player.pointsBreakDown[pointType]
          addPlayerStatsToTree(player, ap, order.slice(1, order.length), bdPoints)
        }
      }
    }
  } else {
    ap = _addPlayerStatsToTree(player, acc, apt)
    ap.points = order.length === 1 ? points : undefined
    ap.accumulatedPoints =
      ap.accumulatedPoints +
      player.pointsBreakDown['3 Pointers'] +
      player.pointsBreakDown['2 Pointers'] +
      player.pointsBreakDown['Free Throws']
    addPlayerStatsToTree(player, ap, order.slice(1, order.length), points)
  }
}

function _addPlayerStatsToTree (
  player: IPlayerStatsListItem,
  acc: IAccumulator,
  apt: string,
  isPointsBreakDown?: boolean
) {
  const { children } = acc
  let ap = children.find((child) => isPointsBreakDown ? child.title === apt : child.title === player[apt])
  if (!ap) {
    ap = {
      accumulatedPoints: 0,
      children: [],
      title: isPointsBreakDown ? apt : player[apt] as string,
      type: isPointsBreakDown ? POINTS_BREAKDOWN : apt
    }
    children.push(ap)
  }
  return ap
}
