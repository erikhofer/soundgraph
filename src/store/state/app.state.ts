import { DeepReadonly } from 'ts-essentials'
import { CytoscapeEdgeDefinition } from '../../graph/Edge'
import { CytoscapeNodeDefinition } from '../../graph/Node'

export type AppState = DeepReadonly<{
  playing: boolean
  nodes: CytoscapeNodeDefinition[]
  edges: CytoscapeEdgeDefinition[]
}>
