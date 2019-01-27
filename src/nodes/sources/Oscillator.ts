import { AudioNodeControlAdapter } from '../AudioNodeControlAdapter'

export class Oscillator extends AudioNodeControlAdapter<void, OscillatorNode> {
  constructor(id: string, context: AudioContext) {
    super(id, context.createOscillator())
  }
}
