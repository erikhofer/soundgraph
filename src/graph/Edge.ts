import { EdgeDefinition } from 'cytoscape'

export interface Edge {
  sourceNodeId: string
  sourceOutputIndex: number
  destinationNodeId: string
  destinationInputIndex: number
}

export const edgeEquals = (e1: Edge, e2: Edge) =>
  e1.sourceNodeId === e2.sourceNodeId &&
  e1.sourceOutputIndex === e2.sourceOutputIndex &&
  e1.destinationNodeId === e2.destinationNodeId &&
  e1.destinationInputIndex === e2.destinationInputIndex

export const getEdgeId = (edge: Edge) =>
  edge.sourceNodeId +
  '-' +
  edge.sourceOutputIndex +
  '-' +
  edge.destinationNodeId +
  '-' +
  edge.destinationInputIndex

export type CytoscapeEdgeDefinition = EdgeDefinition
