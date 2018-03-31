import { Router } from 'express'
import { notifications } from './notifications'
import { playersDaily } from './players-daily'

const apiRouter = Router()

apiRouter.get('/players_daily', playersDaily)
apiRouter.get('/notifications', notifications)

export default apiRouter
