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
  root.sum((d: any) => d.size)
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
    .attr('class', (d: any) => {
      return `${NODE_RECT_CLASS} ${NODE_RECT_CLASS}--${d.data.status}`
    })
    .attr('x', 1)
    .attr('y', 1)
    .attr('width', (d: any) => scale.x(d.y1) - scale.x(d.y0) - 1)
    .attr('height', (d: any) => scale.y(d.x1) - scale.y(d.x0) - 1)
    .on('click', (d: any) => {
      d.children && zoomInOnNode(d, nodeSelection, scale, aggregationPointOrder)
    })

  graph
    .selectAll(`.${NODE_CLASS}`)
    .call(drag()
      .subject((d: any) => ({ x: d.origin.x, y: d.origin.y }))
      .on('start', (d) => {
        dragStarted(d, graph)
      })
      .on('drag', (d: any) => {
        dragged(
          d.data.aggregationType,
          aggregationPointOrder,
          graph
        )
      })
      .on('end', (d: any) => {
        dragEnded(
          d.data.aggregationType,
          aggregationPointOrder,
          graph,
          handleAggregationChange
        )
      })
    )

  graph
    .selectAll(`.${NODE_CLASS}`)
    .append('text')
    .text((d: any) => d.data.name)
    .attr('class', NODE_TEXT_CLASS)
    .classed(NODE_TEXT_CLASS_HIDDEN, (d: any) => scale.y(d.x1) - scale.y(d.x0) < 15)
    .attr('dy', 14)
    .attr('dx', 5)
    // .style('font-size', '13px')

  nodeSelection
    .append('use')
    .attr('class', NODE_ARROW)
    .attr('x', 5)
    .attr('y', 5)
    .on('click', (d: any) => {
      zoomInOnNode(d.parent, nodeSelection, scale, aggregationPointOrder)
    })
}
