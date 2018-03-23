import { BaseType, Selection } from 'd3-selection'

export default function addDefinitions (node: Selection<BaseType, {}, null, undefined>
) {
  const gradient = node
    .append('defs')
    .append('radialGradient')

  gradient
    .attr('id', 'bubble-gradient')

  gradient
    .append('stop')
    .attr('offset', '0%')
    .attr('stop-opacity', '0')
    .attr('stop-color', '#ffffff')

  gradient
    .append('stop')
    .attr('offset', '100%')
    .attr('stop-opacity', '.8')
    .attr('stop-color', '#ffffff')
}
