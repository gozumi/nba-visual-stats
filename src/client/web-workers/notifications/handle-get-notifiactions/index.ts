import { DOM } from 'rx-dom'
import { GET_NOTIFICATIONS_ERROR, SET_NOTIFICATIONS } from 'client/web-workers/_message-types'

import { aggregateNotifications } from '../data-mapper'

/**
 * Handles a GET_NOTIFICATIONS message received by the web worker. It handles
 * this message by making an AJAX call to the notifications API endpoint.
 * If notifications are received successfully, they are sent to the initiator
 * of the GET_NOTIFICATIONS message.
 *
 * If an error is encountered, An error message is sent back to the message
 * initiator.
 * @param ctx The web worker in question
 */
export function handleGetNotifications (ctx: Worker) {
  DOM.ajax({
    responseType: 'json',
    // url: getNotificationServiceURL()
    url: './notifications.json'
  })
  .subscribe(
    (data) => handleAjaxSuccess(data, ctx),
    (error) => handleAjaxErrors(error, ctx)
  )
}

/**
 * Handles successful AJAX calls to the notification endpoint.
 * @param data The notifications received from the AJAX call
 * @param ctx The web worker
 */
function handleAjaxSuccess (data: DOM.AjaxSuccessResponse, ctx: Worker) {
  // XXXX const { aggregationPointTypes, notifications } = data.response
  const { aggregationPointTypes } = data.response
  const dummyNotifications = getDummyNotifications()

  ctx.postMessage({
    aggregations: aggregateNotifications(
      // notifications,
      dummyNotifications,
      aggregationPointTypes.map((type: any) => type.symbol)
    ),
    // notifications,
    notifications: dummyNotifications,
    type: SET_NOTIFICATIONS
  })
}

/**
 * Handles unsuccessful AJAX calls to the notification endpoint.
 * @param error The error received from the AJAX call
 * @param ctx The web worker
 */
function handleAjaxErrors (error: DOM.AjaxSuccessResponse, ctx: Worker) {
  ctx.postMessage({
    error,
    type: GET_NOTIFICATIONS_ERROR
  })
}

function getDummyNotifications (): any[] {
  const returnValue = []

  for (let i = 0; i < (Math.floor(Math.random() * 10000)); i++) {
    returnValue.push({
      aggregationPoints: {
        fund: `Fund Name ${i % 4}`,
        instrumentType: `Instrument Type ${i % 12}`,
        position: `Position ${i % 14}`,
        status: 'error'
      },
      message: `Message number ${i}`
    })
  }

  for (let i = 0; i < (Math.floor(Math.random() * 100000)); i++) {
    returnValue.push({
      aggregationPoints: {
        fund: `Fund Name ${i % 4}`,
        instrumentType: `Instrument Type ${i % 12}`,
        position: `Position ${i % 14}`,
        status: 'success'
      },
      message: `Message number ${i}`
    })
  }

  return returnValue
}
