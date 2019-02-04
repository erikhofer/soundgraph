import { DeepReadonly } from 'ts-essentials'
import { CytoscapeNodeDefinition } from '../../graph/Node'

export type AppState = DeepReadonly<{
  playing: boolean
  nodes: CytoscapeNodeDefinition[]
}>
