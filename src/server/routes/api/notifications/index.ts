/* tslint:disable:object-literal-sort-keys */
import { Request, Response } from 'express'

export function notifications (req: Request, res: Response) {
  res.json({
    aggregationPointTypes: [
      { symbol: 'status', value: 'Status' },
      { symbol: 'fund', value: 'Fund' },
      { symbol: 'instrumentType', value: 'Instrument Type' },
      { symbol: 'position', value: 'Position' }
    ],
    notifications: [
      {
        message: '01 - Something has happened!',
        aggregationPoints: {
          status: 'error',
          fund: 'Fund One',
          instrumentType: 'Instrument Type One',
          position: 'Position'
        }
      },
      {
        message: '02 - Something has happened!',
        aggregationPoints: {
          status: 'success',
          fund: 'Fund One',
          instrumentType: 'Instrument Type One',
          position: 'Position'
        }
      },
      {
        message: '03 - Something has happened!',
        aggregationPoints: {
          status: 'error',
          fund: 'Fund One',
          instrumentType: 'Instrument Type One',
          position: 'Position'
        }
      },
      {
        message: '03 - Something has happened!',
        aggregationPoints: {
          status: 'success',
          fund: 'Fund One',
          instrumentType: 'Instrument Type 2',
          position: 'Position 01'
        }
      },
      {
        message: '04 - Something has happened!',
        aggregationPoints: {
          status: 'success',
          fund: 'Fund One',
          instrumentType: 'Instrument Type One',
          position: 'Position'
        }
      },
      {
        message: '05 -Something has happened!',
        aggregationPoints: {
          status: 'error',
          fund: 'Fund One',
          instrumentType: 'Instrument Type One',
          position: 'Position'
        }
      },
      {
        message: '06 -Something has happened!',
        aggregationPoints: {
          status: 'success',
          fund: 'Fund One',
          instrumentType: 'Instrument Type One',
          position: 'Position'
        }
      },
      {
        message: '07 - Something has happened!',
        aggregationPoints: {
          status: 'success',
          fund: 'Fund One',
          instrumentType: 'Instrument Type One',
          position: 'Position'
        }
      },
      {
        message: '08 - Something has happened!',
        aggregationPoints: {
          status: 'error',
          fund: 'Fund One',
          instrumentType: 'Instrument Type One',
          position: 'Position'
        }
      },
      {
        message: '09 - Something has happened!',
        aggregationPoints: {
          status: 'error',
          fund: 'Fund One',
          instrumentType: 'Instrument Type One',
          position: 'Position'
        }
      },
      {
        message: '10 - Something has happened!',
        aggregationPoints: {
          status: 'success',
          fund: 'Fund One',
          instrumentType: 'Instrument Type One',
          position: 'Position'
        }
      }
    ]
  })
}
