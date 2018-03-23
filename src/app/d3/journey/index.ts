import { journeyDataMapper } from 'app/d3/journey/data-mappers'
import { IJourney } from 'app/state/reducers/journey/default-state'
import { select } from 'd3-selection'

import addDefinitions from '../definititions'
import { startSimmulation } from './force-simmulation'

interface ID3JourneyProps {
  journey: IJourney
}

/**
 * Draws a specific journey.
 * @param domNode The DOM node in which to draw the journey
 * @param props THe properties used to draw the journey
 */
export function renderD3Journey (domNode: SVGSVGElement, props: ID3JourneyProps) {
  const { journey } = props
  const svg = select(domNode)
  const { width, height } = domNode ? domNode.getBoundingClientRect() : { width: 0, height: 0 }

  addDefinitions(svg)

  const bubbles = svg
    .append('g')

  bubbles
    .attr('class', 'journey-d3__bubbles')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  const nodes: any[] = journey.map(journeyDataMapper)
  nodes[0].fx = nodes[0].fy = 0

  startSimmulation(nodes, bubbles)
}
