import { IPlayerStatsListItem } from 'server/routes/api/player-stats/_interfaces'

export const THREE_POINTERS = '3 Pointers'
export const TWO_POINTERS = '2 Pointers'
export const FREE_THROWS = 'Free Throws'

interface IAccumulator {
  title: string
  type: string
  accumulatedPoints: number
  value: number
  points?: number
  children: IAccumulator[]
  [THREE_POINTERS]: number
  [TWO_POINTERS]: number
  [FREE_THROWS]: number
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
    type: '',
    value: 0,
    [THREE_POINTERS]: 0,
    [TWO_POINTERS]: 0,
    [FREE_THROWS]: 0
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
          ap.value = ap.points = order.length === 1 ? bdPoints : undefined
          ap.accumulatedPoints = ap.accumulatedPoints + player.pointsBreakDown[pointType]
          addPlayerStatsToTree(player, ap, order.slice(1, order.length), bdPoints)
        }
      }
    }
  } else {
    ap = _addPlayerStatsToTree(player, acc, apt)
    ap.value = ap.points = order.length === 1 ? points : undefined
    ap.accumulatedPoints =
      ap.accumulatedPoints +
      player.pointsBreakDown[THREE_POINTERS] +
      player.pointsBreakDown[TWO_POINTERS] +
      player.pointsBreakDown[FREE_THROWS]
    ap[THREE_POINTERS] = ap[THREE_POINTERS] + player.pointsBreakDown[THREE_POINTERS]
    ap[TWO_POINTERS] = ap[TWO_POINTERS] + player.pointsBreakDown[TWO_POINTERS]
    ap[FREE_THROWS] = ap[FREE_THROWS] + player.pointsBreakDown[FREE_THROWS]
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
      type: isPointsBreakDown ? POINTS_BREAKDOWN : apt,
      value: 0,
      [THREE_POINTERS]: 0,
      [TWO_POINTERS]: 0,
      [FREE_THROWS]: 0
    }
    children.push(ap)
  }
  return ap
}
