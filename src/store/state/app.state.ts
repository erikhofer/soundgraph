import { DeepReadonly } from 'ts-essentials'
import { CytoscapeEdgeDefinition } from '../../graph/Edge'
import { CytoscapeNodeDefinition } from '../../graph/Node'
import { PlaybackState } from './playback.state'

export type AppState = DeepReadonly<{
  playback: PlaybackState
  nodes: CytoscapeNodeDefinition[]
  edges: CytoscapeEdgeDefinition[]
}>
