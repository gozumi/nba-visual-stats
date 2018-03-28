export type IJourney = IWaypoint[]

export interface IWaypoint {
  id: string,
  label: string,
  options: IWaypoint[]
}

const DEFAULT_STATE: IJourney = [
  {
    id: 'wp-01',
    label: 'start your joiurney',
    options: [
      { id: 'wp-02', label: 'Rejuvenate', options: [] },
      { id: 'wp-03', label: 'Heal', options: [] },
      { id: 'wp-04', label: 'Relax', options: [] }
    ]
  }
]

export default DEFAULT_STATE
