/* tslint:disable:object-literal-sort-keys */
import { NextFunction, Request, Response } from 'express'
import * as request from 'request'

export function playersDaily (req: Request, res: Response, next: NextFunction) {
  const url = 'https://stats.nba.com/js/data/widgets/home_daily.json'

  request(url, (error: any, response: request.Response, body: any) => {
    if (error) {
      res.sendStatus(500)
    }
    res.json(JSON.parse(body))
  })
}
