import { event, Selection } from 'd3'

import { IScale, updateAggegationPointTypePosition, updateOriginOnDatum } from '../../_node_utils'
import {
  AGGREGATION_CLASS,
  NODE_ARROW,
  NODE_CLASS,
  NODE_CLASS_ACTIVE,
  NODE_CLASS_DROPABLE,
  NODE_TEXT_CLASS,
  NODE_TEXT_CLASS_HIDDEN
} from '../_constants'

/**
 * Zooms in on a specific selection in the layout.
 * @param datum The node's data
 * @param nodeSelection The selection to zoom
 * @param scale The scale to use with the zoom
 */
export function zoomInOnNode (
  datum: any,
  nodeSelection: Selection<any, any, any, {}>,
  scale: IScale,
  aggregationPointOrder: any[]
) {
  scale.x.domain([datum.parent ? datum.y0 : datum.y1, scale.width])
  scale.y.domain([datum.x0, datum.x1])

  const transition = nodeSelection
    .transition()
    .duration(750)
    .attr('transform', (d: any) => {
      updateOriginOnDatum(d, scale)
      updateAggegationPointTypePosition(d, aggregationPointOrder)
      return `translate(${scale.x(d.y0)}, ${scale.y(d.x0)})`
    })

  transition
    .selectAll('rect')
    .attr('width', (d: any) => {
      return scale.x(d.y1) - scale.x(d.y0) - 1
    })
    .attr('height', (d: any) => {
      return scale.y(d.x1) - scale.y(d.x0) - 1
    })

  transition
    .selectAll(`.${NODE_TEXT_CLASS}`)
    .attr('dx', (d: any) => {
      return d.parent && (d === datum) ? 55 : 5
    })
    .attr('dy', (d: any) => {
      return d.parent && (d === datum) ? 23 : 15
    })

  const selectedNodeClass = `${NODE_CLASS}--selected`
  nodeSelection
    .classed(selectedNodeClass, (d) => d === datum)
    .select(`.${NODE_ARROW}`)
    .attr('xlink:href', (d) => d.parent && (d === datum) ? '#zoom-out-arrow' : null)

  nodeSelection
    .selectAll(`.${NODE_TEXT_CLASS}`)
    .classed(NODE_TEXT_CLASS_HIDDEN, (d: any) => scale.y(d.x1) - scale.y(d.x0) < 15)

}

/**
 * Initiates the start of drag of a specific node in the layout.
 * @param d The nodes data
 */
export function dragStarted (datum: any, graph: Selection<any, any, any, {}>) {
  const { aggregationType } = datum.data
  graph.selectAll(`.${AGGREGATION_CLASS}__${aggregationType}`)
    .classed(NODE_CLASS_ACTIVE, true)
}

/**
 * Implements the drag of a specific node in the layout.
 * @param d The nodes data
 */
export function dragged (
  aggregationType: string,
  aggregationPointOrder: any[],
  graph: Selection<any, any, any, {}>
) {
  graph.selectAll(`.${AGGREGATION_CLASS}__${aggregationType}`)
    .raise()
    .attr('transform', (d: any) => `translate(${event.x}, ${d.origin.y})`)
    .classed(NODE_CLASS_DROPABLE, () => {
      return isAggregationPointRepositioned(
        aggregationPointOrder,
        aggregationType,
        event.x
      )
    })
}

/**
 * Ends a drag of a specific node in the layout. It does this by determining wether the coloumn
 * of aggregation that has been dragged has been moved to a new position within the sequence of
 * aggregation order.
 * @param d The nodes data
 */
export function dragEnded (
  aggregationType: string,
  aggregationPointOrder: any[],
  graph: Selection<any, any, any, {}>,
  handleChangeAggregation: (order: string[]) => void
) {
  const column = graph.selectAll(`.${AGGREGATION_CLASS}__${aggregationType}`)

  if (isAggregationPointRepositioned(aggregationPointOrder, aggregationType, event.x)) {
    column
    .classed('active', (d: any) => {
      d.origin.x = event.x
      return false
    })
    handleChangeAggregation(
      aggregationPointOrder
        .map((type) => type.symbol === aggregationType ? { ...type , x: event.x } : type)
        .sort((a, b) => {
          if (a.x < b.x) { return -1 }
          if (a.x > b.x) { return 1 }
          return 0
        })
        .map((type) => type.symbol)
    )
  } else {
    column
      .transition()
      .duration(300)
      .attr('transform', (d: any) => `translate(${d.origin.x}, ${d.origin.y})`)
    column
      .classed(NODE_CLASS_ACTIVE, false)
  }
}

function isAggregationPointRepositioned (
  aggregationPointOrder: any[],
  aggregationType: string,
  xPos: number
) {
  const i = aggregationPointOrder.findIndex((el) => el.symbol === aggregationType)

  return (i > 0 && xPos < aggregationPointOrder[i - 1].x)
    || ((i + 1) < aggregationPointOrder.length && xPos > aggregationPointOrder[i + 1].x)
}
