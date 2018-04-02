import { drag, hierarchy, partition as d3Partition, scaleLinear, select } from 'd3'

import { IAggregation } from '../../partition-layout.component'
import {
  IScale,
  setNodeClass,
  setNodeTransform,
  updateAggegationPointTypePosition,
  updateOriginOnDatum
} from '../_node_utils'
import {
  GRAPH_CLASS,
  NODE_ARROW,
  NODE_CLASS,
  NODE_RECT_CLASS,
  NODE_TEXT_CLASS,
  NODE_TEXT_CLASS_HIDDEN
} from './_constants'
import { calculateNodeHeight, calculateNodeWidth, calculateText } from './calculation-handlers'
import { dragEnded, dragged, dragStarted, zoomInOnNode } from './event-handlers'

export interface ID3PartitionProps {
  domNode: SVGSVGElement,
  aggregations: IAggregation,
  handleAggregationChange: (order: string[]) => void
}

/**
 * Draws a partition layout.
 * @param props The properties used to define the drawing
 */
export function renderD3PartitionLayout (props: ID3PartitionProps) {
  const { aggregations, domNode, handleAggregationChange } = props

  const aggregationPointOrder: any [] = []

  // terminate the function if there are no aggregations.
  if (!aggregations) {
    return
  }

  const { width, height } = domNode ? domNode.getBoundingClientRect() : { width: 0, height: 0 }
  const resolution = { width: 10000000, height: 10000000 }

  // remove old graph
  select(domNode)
    .selectAll(`.${GRAPH_CLASS}`)
    .remove()

  const graph = select(domNode)
    .append('g')
    .attr('class', GRAPH_CLASS)

  const partition = d3Partition()
    .size([resolution.height, resolution.width])
    .round(true)

  const root = hierarchy(aggregations)
  root.sum((d: any) => d.points)
  partition(root)
  const data = root.descendants()

  const scale: IScale = {
    height: resolution.height,
    width: resolution.width,
    x: scaleLinear().domain([(data[0] as any).y1, resolution.width]).range([0, width]),
    y: scaleLinear().domain([0, resolution.height]).range([0, height])
  }

  const nodeSelection = graph
    .selectAll(`.${NODE_CLASS}`)
    .data(data)
    .enter().append('g')
    .attr('class', setNodeClass)
    .attr('transform', (d) => {
      updateOriginOnDatum(d, scale)
      updateAggegationPointTypePosition(d, aggregationPointOrder)
      return setNodeTransform(d)
    })

  nodeSelection
    .append('rect')
    .attr('class', (d: any) => NODE_RECT_CLASS)
    .attr('x', 1)
    .attr('y', 1)
    .attr('width', (d) => calculateNodeWidth(d, scale))
    .attr('height', (d) => calculateNodeHeight(d, scale))

  graph
    .selectAll(`.${NODE_CLASS}`)
    .call(drag()
      .subject((d: any) => ({ x: d.origin.x, y: d.origin.y }))
      .on('start', (d) => {
        dragStarted(d, graph)
      })
      .on('drag', (d: any) => {
        dragged(
          d.data.type,
          aggregationPointOrder,
          graph
        )
      })
      .on('end', (d: any) => {
        dragEnded(
          d.data.type,
          aggregationPointOrder,
          graph,
          handleAggregationChange
        )
      })
    )

  graph
    .selectAll(`.${NODE_CLASS}`)
    .append('foreignObject')
    .append('xhtml:ul')
    .attr('xmlns', 'http://www.w3.org/1999/xhtml')
    .html(calculateText)
    .attr('class', NODE_TEXT_CLASS)
    .classed(NODE_TEXT_CLASS_HIDDEN, (d: any) => scale.y(d.x1) - scale.y(d.x0) < 15)
    .attr('style', (d: any) => {
      const rectWidth = scale.x(d.y1) - scale.x(d.y0) - 5
      const rectHeight = scale.y(d.x1) - scale.y(d.x0) - 3
      return `width: ${rectWidth}px; height: ${rectHeight}px; padding: 3px 0 0 5px; margin: 0`
    })
    .on('click', (d: any) => {
      d.children && zoomInOnNode(d, nodeSelection, scale, aggregationPointOrder)
    })

  nodeSelection
    .append('use')
    .attr('class', NODE_ARROW)
    .attr('x', 5)
    .attr('y', 5)
    .on('click', (d: any) => {
      zoomInOnNode(d.parent, nodeSelection, scale, aggregationPointOrder)
    })
}
