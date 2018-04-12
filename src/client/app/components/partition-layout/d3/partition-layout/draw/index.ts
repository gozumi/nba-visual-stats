import { drag, event, HierarchyNode, Selection } from 'd3'

import { IAggregation } from '..'
import { IDrawingSelections, IHierarchyNode } from '../../_interfaces'
import {
  IScale,
  setNodeClass,
  setNodeTransform,
  updateAggegationPointTypePosition,
  updateOriginOnDatum
} from '../../_node_utils'
import {
  NODE_ARROW,
  NODE_CLASS,
  NODE_RECT_CLASS,
  NODE_TEXT_CLASS,
  NODE_TEXT_CLASS_CONTAINER,
  NODE_TEXT_CLASS_HIDDEN
} from '../_constants'
import { calculateNodeHeight, calculateNodeWidth } from '../calculation-handlers'
import { dragColumn, endColumnDrag, startColumnDrag } from '../event-handlers/column-drag'
import { updateScaleToZoom, zoomInOnNode } from '../event-handlers/zoom'

/**
 *
 * @param graph
 * @param data
 * @param scale
 * @param aggregationPointOrder
 * @param aggregationChangeHandler
 * @param nodeHtmlHandler
 */
export function drawColumn (
  graph: Selection<any,any,any,any>,
  data: IHierarchyNode[],
  scale: IScale,
  aggregationPointOrder: string[],
  aggregationChangeHandler: (order: string[]) => void,
  nodeHtmlHandler: (d: any) => string
): IDrawingSelections {
  const nodes = graph
    .selectAll(`.${NODE_CLASS}`)
    .data(data)
    .enter().append('g')
    .attr('class', setNodeClass)
    .attr('transform', (d) => {
      updateOriginOnDatum(d, scale)
      updateAggegationPointTypePosition(d, aggregationPointOrder)
      return setNodeTransform(d)
    })

  const rectangles = nodes
    .append('rect')
    .attr('class', NODE_RECT_CLASS)
    .attr('x', 1)
    .attr('y', 1)
    .attr('width', (d) => calculateNodeWidth(d, scale))
    .attr('height', (d) => calculateNodeHeight(d, scale))

  const columnSelection = (nodes as Selection<any, any, any, any>)
    .call(drag()
      .subject((d: IHierarchyNode) => ({ x: d.origin.x, y: d.origin.y }))
      .on('start', () => startColumnDrag(columnSelection))
      .on('drag', (d: IHierarchyNode) => dragColumn(d.data.type, aggregationPointOrder, columnSelection))
      .on('end', (d: IHierarchyNode) => {
        endColumnDrag(
          d.data.type,
          aggregationPointOrder,
          columnSelection,
          aggregationChangeHandler
        )
      })
    )

  const text = nodes
    .append('foreignObject')
    .attr('class', NODE_TEXT_CLASS_CONTAINER)
    .append('xhtml:ul')
    .attr('xmlns', 'http://www.w3.org/1999/xhtml')
    .html(nodeHtmlHandler)
    .attr('class', NODE_TEXT_CLASS)
    .classed(NODE_TEXT_CLASS_HIDDEN, (d: IHierarchyNode) => scale.y(d.x1) - scale.y(d.x0) < 15)
    .style('width', (d: IHierarchyNode) => `${scale.x(d.y1) - scale.x(d.y0) - 5}px`)
    .style('height', (d: IHierarchyNode) => `${scale.y(d.x1) - scale.y(d.x0) - 3}px`)
    .style('padding', '3px 0 0 5px')
    .style('margin', '0')

  const arrows = nodes
    .append('use')
    .attr('class', NODE_ARROW)
    .attr('x', 5)
    .attr('y', 5)

  return { arrows, nodes, rectangles, text }
}
