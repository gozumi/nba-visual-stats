const DEFAULT_STATE: ISystemState = {
  fetching: false,
  time: null
}

export default DEFAULT_STATE

export interface ISystemState {
  fetching: boolean,
  time: Date
}
