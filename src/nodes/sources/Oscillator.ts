import { ReactAudioNodeAdapter } from '../ReactAudioNodeAdapter'

export class Oscillator extends ReactAudioNodeAdapter<
  'Oscillator',
  void,
  OscillatorNode
> {
  constructor(id: string, context: AudioContext) {
    super('Oscillator', id, context.createOscillator())
    this.audioNode.start()
  }
}
