interface INotification {
  message: string,
  aggregationPoints: IAggregationPoints
}

interface IAggregationPoints {
  [pointName: string]: string
}

/**
 * Maps notifications received by the notifications API endpoint to
 * the notification format needed by this application.
 * @param notifications The notifications to map
 */
export function aggregateNotifications (
  list: INotification[],
  aggregationOrder: string[]
) {

  const accumulator: { children: any[], name: string } = {
    children: [],
    name: 'All'
  }

  for (const notification of list) {
    const { aggregationPoints } = notification
    const { children } = accumulator
    const firstPoint = aggregationOrder[0]
    const firstPointLabel = aggregationPoints[firstPoint]
    let interim = children.find((child) => child.name === firstPointLabel)
      || (children.push({
        aggregationType: aggregationOrder[0],
        children: [],
        name: firstPointLabel,
        status: aggregationPoints.status
      }) && children.find((child) => child.name === firstPointLabel))

    for (let i = 1; i <= aggregationOrder.length; i++) {
      if (i === aggregationOrder.length) {
        interim.children.push({
          name: 'Notification',
          size: 1,
          status: aggregationPoints.status
        })
      } else {
        const point = aggregationOrder[i]
        const pointLabel = aggregationPoints[point]
        interim = interim.children.find((child: any) => child.name === pointLabel)
          || (interim.children.push({
            aggregationType: aggregationOrder[i],
            children: [],
            name: pointLabel,
            status: aggregationPoints.status
          }) && interim.children.find((child: any) => child.name === pointLabel))
      }
    }
  }

  return accumulator
}
