import { SET_DAILY, SET_DAILY_ERROR } from 'client/web-workers/_message-types'
import { DOM } from 'rx-dom'

import { aggregateData } from '../data-mapper'

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
export function handleGetDaily (ctx: Worker) {
  DOM.ajax({
    responseType: 'json',
    url: `${API_URL_BASE}api/players_daily`
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
  ctx.postMessage({
    daily: data.response,
    // aggregations: aggregateData(
    //   data.response,
    //   aggregationPointTypes.map((type: any) => type.symbol)
    // ),
    type: SET_DAILY
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
    type: SET_DAILY_ERROR
  })
}
