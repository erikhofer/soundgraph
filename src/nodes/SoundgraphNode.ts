import { NodeType } from '../graph/Node'
import { Speakers } from './destinations/Speakers'
import { Oscillator } from './sources/Oscillator'

export type SoundgraphNode = Oscillator | Speakers

export type SoundgraphNodeType = NodeType<SoundgraphNode>
