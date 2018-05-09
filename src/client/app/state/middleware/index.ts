import { requestAggregationChangeFromWebWorker, requestPlayerStats } from './players'

const combinedMiddleware = [
  requestPlayerStats,
  requestAggregationChangeFromWebWorker
]

export default combinedMiddleware
