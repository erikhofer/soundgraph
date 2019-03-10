import { v4 as generateUuid } from 'uuid'
import { NodeFactory } from '../graph/NodeFactory'
import { Speakers } from './destinations/Speakers'
import { Delay } from './effects/Delay'
import { Gain } from './effects/Gain'
import { SoundgraphNode, SoundgraphNodeType } from './SoundgraphNode'
import { Oscillator } from './sources/Oscillator'

export class SoundgraphNodeFactory implements NodeFactory<SoundgraphNode> {
  public constructor(private audioContext: AudioContext) {}

  public createNode(type: SoundgraphNodeType, id?: string): SoundgraphNode {
    if (!id) {
      id = generateUuid()
    }
    const { audioContext } = this
    switch (type) {
      case 'Gain':
        return new Gain(id, audioContext)
      case 'Oscillator':
        return new Oscillator(id, audioContext)
      case 'Speakers':
        return new Speakers(id, audioContext)
      case 'Delay':
        return new Delay(id, audioContext)
    }
    throw new Error(
      `Creation of node with type '${type}' not implemented in SoundgraphNodeFactory`
    )
  }
}
