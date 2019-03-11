import { DeepReadonly } from 'ts-essentials'
import { CytoscapeEdgeDefinition } from '../../graph/Edge'
import { CytoscapeNodeDefinition } from '../../graph/Node'
import { FileState } from './file.state'
import { PlaybackState } from './playback.state'

export type AppState = DeepReadonly<{
  playback: PlaybackState
  nodes: CytoscapeNodeDefinition[]
  edges: CytoscapeEdgeDefinition[]
  file: FileState
}>
