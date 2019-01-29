import { AudioNodeControlAdapter } from '../AudioNodeControlAdapter'

export class Speakers extends AudioNodeControlAdapter<
  void,
  AudioDestinationNode
> {
  constructor(id: string, context: AudioContext) {
    super(id, context.destination)
  }
}
