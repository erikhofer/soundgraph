import { ReactAudioNodeAdapter } from '../ReactAudioNodeAdapter'

export class Gain extends ReactAudioNodeAdapter<'Gain', void, GainNode> {
  constructor(id: string, context: AudioContext) {
    super('Gain', id, context.createGain())
  }
}
