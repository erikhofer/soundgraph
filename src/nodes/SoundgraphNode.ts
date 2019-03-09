import { NodeType } from '../graph/Node'
import { Speakers } from './destinations/Speakers'
import { Delay } from './effects/Delay'
import { Gain } from './effects/Gain'
import { Oscillator } from './sources/Oscillator'

export type SoundgraphNode = Oscillator | Speakers | Gain | Delay

export type SoundgraphNodeType = NodeType<SoundgraphNode>
