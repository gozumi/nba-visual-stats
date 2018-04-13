import { drag, Selection } from 'd3'

import { IDrawingSelections, PartitionHierarchyNode } from '../../_interfaces'
import {
  IScale,
  setNodeClass,
  setNodeHtmlBoxStyle,
  setNodeTransform,
  updateAggegationPointTypePosition,
  updateOriginOnDatum
} from '../../_node_utils'
import {
  NODE_ARROW,
  NODE_CLASS,
  NODE_RECT_CLASS,
  NODE_TEXT_CLASS,
  NODE_TEXT_CLASS_CONTAINER
} from '../_constants'
import { calculateNodeHeight, calculateNodeWidth } from '../calculation-handlers'
import { dragColumn, endColumnDrag, startColumnDrag } from '../event-handlers/column-drag'

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
  data: PartitionHierarchyNode[],
  scale: IScale,
  aggregationPointOrder: string[],
  aggregationChangeHandler: (order: string[]) => void,
  nodeHtmlHandler: (d: any) => string,
  nodeHtmlClassName: string
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
      .subject((d: PartitionHierarchyNode) => ({ x: d.origin.x, y: d.origin.y }))
      .on('start', () => startColumnDrag(columnSelection))
      .on('drag', (d: PartitionHierarchyNode) => dragColumn(d.data.type, aggregationPointOrder, columnSelection))
      .on('end', (d: PartitionHierarchyNode) => {
        endColumnDrag(
          d.data.type,
          aggregationPointOrder,
          columnSelection,
          aggregationChangeHandler
        )
      })
    )

  const nodeClass = nodeHtmlClassName ? `${NODE_TEXT_CLASS} ${nodeHtmlClassName}` : NODE_TEXT_CLASS
  const text = nodes
    .append('foreignObject')
    .attr('class', NODE_TEXT_CLASS_CONTAINER)
    .append('xhtml:div')
    .attr('xmlns', 'http://www.w3.org/1999/xhtml')
    .html(nodeHtmlHandler)
    .attr('class', nodeClass)
    .attr('style', (d) => setNodeHtmlBoxStyle(d, scale))

  const arrows = nodes
    .append('use')
    .attr('class', NODE_ARROW)
    .attr('x', 5)
    .attr('y', 5)

  return { arrows, nodes, rectangles, text }
}
