import { IWaypoint } from 'app/state/reducers/journey/default-state'

export function journeyDataMapper (waypoint: IWaypoint, idx: number) {
  return {
    ...waypoint,
    r: 30
  }
}
