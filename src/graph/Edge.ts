import { EdgeDefinition } from 'cytoscape'

export interface Edge {
  sourceNodeId: string
  sourceOutputIndex: number
  destinationNodeId: string
  destinationInputIndex: number
}

export type CytoscapeEdgeDefinition = EdgeDefinition
