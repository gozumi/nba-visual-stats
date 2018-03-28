import { ScaleLinear } from 'd3'

import { AGGREGATION_CLASS, NODE_CLASS } from '../partition-layout/_constants'

export interface IScale {
  x: ScaleLinear<number, number>,
  y: ScaleLinear<number, number>,
  width: number,
  height: number
}

/**
 * Sets the classes associated with the node.
 * @param d The nodes datum
 */
export function setNodeClass (d: any) {
  const { aggregationType } = d.data
  const aggregationTypeClass = aggregationType ? `${AGGREGATION_CLASS}__${aggregationType}` : ''
  const typeClass = `${NODE_CLASS}--${d.children ? 'internal' : 'leaf'}`
  return `${NODE_CLASS} ${typeClass} ${aggregationTypeClass}`.trim()
}

/**
 * Calculates the x & y origin coordinates for the node.
 * @param d The nodes datum
 * @param scale The scale to use to calculate coordinates
 */
export function updateOriginOnDatum (d: any, scale: IScale) {
  d.origin = { x: scale.x(d.y0), y: scale.y(d.x0) }
}

/**
 * Adds the current aggregation point type to the array of current aggregation
 * point types without dupplicating. Also updates the current x position of the
 * aggregation point type.
 * @param d The nodes datum
 * @param types The current list of aggregation point types that have been seen
 * so far
 */
export function updateAggegationPointTypePosition (d: any, types: any[]) {
  const { aggregationType } = d.data
  if (aggregationType) {
    const apt = types.find((item) => item.symbol === aggregationType)
    if (apt) {
      apt.x = d.origin.x
    } else {
      types.push({ symbol: aggregationType, x: d.origin.x })
    }
  }
}

/**
 * Sets the transform associated with the node.
 * @param d The nodes datum
 */
export function setNodeTransform (d: any) {
  const { x, y } = d.origin
  return `translate(${x}, ${y})`
}
