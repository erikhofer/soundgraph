import { NodeFactory } from '../graph/NodeFactory'
import { SoundgraphNodeType } from './SoundgraphNode'

export class SoundgraphNodeFactory implements NodeFactory<SoundgraphNodeType> {
  public constructor(private audioContext: AudioContext) {}

  public createNode(type: 'Oscillator' | 'Speakers'): Soundgr {
    throw new Error('Method not implemented.')
  }
}
