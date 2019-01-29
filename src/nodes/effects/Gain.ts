import { AudioNodeControlAdapter } from '../AudioNodeControlAdapter'

export class Gain extends AudioNodeControlAdapter<void, GainNode> {
  constructor(id: string, context: AudioContext) {
    super(id, context.createGain())
  }
}
