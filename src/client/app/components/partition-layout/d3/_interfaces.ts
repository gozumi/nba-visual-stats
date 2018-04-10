import { HierarchyNode, Selection } from 'd3'
import { IAggregation } from './partition-layout'

export interface IHierarchyDimensions {
  x0?: number
  x1?: number
  y0?: number
  y1?: number
  origin?: {
    x: number
    y: number
  }
}

export type IHierarchyNode = HierarchyNode<IAggregation> & IHierarchyDimensions

export interface IDrawingSelections {
  arrows: Selection<any, any, any, any>
  nodes: Selection<any, any, any, any>
  rectangles: Selection<any, any, any, any>
  text: Selection<any, any, any, any>
}
