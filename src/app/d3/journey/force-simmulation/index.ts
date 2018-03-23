import { BaseType, forceCollide, forceRadial, forceSimulation, Selection } from 'd3'

import { BUBBLE_CLASS, BUBBLE_GRADIENT } from '../_constants'
import { handleBubbleClick } from '../event-handlers'

export function startSimmulation (
  nodes: any[],
  bubbles: Selection<BaseType, {}, null, undefined>
) {

  const bubblesSelection = bubbles
    .selectAll(`.${BUBBLE_CLASS}`)
    .data(nodes, (d: any) => d.id)

  bubblesSelection
    .enter()
    .append('circle')
    .attr('id', (d: any) => d.id)
    .attr('class', BUBBLE_CLASS)
    .attr('r', (d: any) => d.r)
    .attr('cx', (d: any) => d.x)
    .attr('cy', (d: any) => d.y)
    .attr('fill', BUBBLE_GRADIENT)
    .attr('fill-opacity', '1')
    .transition()
    .duration(1000)
    .attr('fill-opacity', '.5')

  bubblesSelection
    .exit().remove()

  forceSimulation(nodes)
    .velocityDecay(0.02)
    .force('collide',
      forceCollide()
        .radius((d: any) => d.r + 5)
        .strength(0.002)
        .iterations(2)
      )
    .force('radial',
      forceRadial(100)
        .strength(0.01)
      )
    .on('tick', () => ticked(bubbles))
    .on('end', () => ended(bubbles, nodes))
}

function ticked (bubbles: Selection<BaseType, {}, null, undefined>) {

  bubbles
    .selectAll(`.${BUBBLE_CLASS}`)
    .attr('cx', (d: any) => d.x)
    .attr('cy', (d: any) => d.y)
    .on('click', null)
}

function ended (
  bubbles: Selection<BaseType, {}, null, undefined>,
  nodes: any[]
) {
  const bubblesSelection = bubbles
    .selectAll(`.${BUBBLE_CLASS}`)

  bubblesSelection
    .transition()
    .duration(2000)
    .attr('fill-opacity', '1')

  bubblesSelection
    .on('click', (d: any) => startSimmulation(handleBubbleClick(d, nodes), bubbles))

}
