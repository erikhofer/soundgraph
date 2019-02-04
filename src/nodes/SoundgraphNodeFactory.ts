import { v4 as generateUuid } from 'uuid'
import { NodeFactory } from '../graph/NodeFactory'
import { Gain } from './effects/Gain'
import { SoundgraphNode, SoundgraphNodeType } from './SoundgraphNode'

export class SoundgraphNodeFactory implements NodeFactory<SoundgraphNode> {
  public constructor(private audioContext: AudioContext) {}

  public createNode(type: SoundgraphNodeType): SoundgraphNode {
    const id = generateUuid()
    switch (type) {
      case 'Gain':
        return new Gain(id, this.audioContext)
    }
    throw new Error('Method not implemented.')
  }
}
