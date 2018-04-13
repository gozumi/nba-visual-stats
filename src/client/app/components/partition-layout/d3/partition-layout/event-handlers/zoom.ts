import { Selection } from 'd3'

import { PartitionHierarchyNode } from '../../_interfaces'
import { IScale, setNodeHtmlBoxStyle, translateNodePosition } from '../../_node_utils'
import { NODE_ARROW, NODE_CLASS, NODE_TEXT_CLASS, NODE_TEXT_CLASS_HIDDEN } from '../_constants'
import { calculateNodeHeight, calculateNodeWidth } from '../calculation-handlers'

/**
 * Zooms in on a specific selection in the layout.
 * @param datum The node's data
 * @param nodeSelection The selection to zoom
 * @param scale The scale to use with the zoom
 */
export function zoomInOnNode (
  datum: PartitionHierarchyNode,
  nodeSelection: Selection<any, any, any, {}>,
  rectangleSelection: Selection<any, any, any, any>,
  textSelection: Selection<any, any, any, any>,
  scale: IScale,
  aggregationPointOrder: string[]
) {
  const duration = 750
  nodeSelection
    .transition()
    .duration(duration)
    .attr('transform', (d: any) => translateNodePosition(d, aggregationPointOrder, scale))

  rectangleSelection
    .transition()
    .duration(duration)
    .attr('width', (d) => calculateNodeWidth(d, scale))
    .attr('height', (d) => calculateNodeHeight(d, scale))

  textSelection
    .transition()
    .duration(duration)
    .attr('style', (d) => setNodeHtmlBoxStyle(d, scale))
    .style('height', (d) => {
      const offset = d.parent && (d === datum) ? 40 : 0
      const rectHeight = scale.y(d.x1) - scale.y(d.x0) - offset
      return `${rectHeight}px`
    })
    .style('padding-top', (d: PartitionHierarchyNode) => {
      const offset = d.parent && (d === datum) ? 40 : 0
      return `${offset}px`
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
 * This function updates th given scale in order to focus the viewing
 * area on the given datum.
 * @param scale The scale to be updated
 * @param datum The datum used to update the scale
 */
export function updateScaleToZoom (scale: IScale, datum: PartitionHierarchyNode): IScale {
  scale.x.domain([datum.parent ? datum.y0 : datum.y1, scale.width])
  scale.y.domain([datum.x0, datum.x1])

  return scale
}
