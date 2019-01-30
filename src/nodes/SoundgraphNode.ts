import { NodeType } from '../graph/Node'
import { Speakers } from './destinations/Speakers'
import { Gain } from './effects/Gain'
import { Oscillator } from './sources/Oscillator'

export type SoundgraphNode = Oscillator | Speakers | Gain

export type SoundgraphNodeType = NodeType<SoundgraphNode>
