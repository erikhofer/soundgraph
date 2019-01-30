import { ReactAudioNodeAdapter } from '../ReactAudioNodeAdapter'

export class Speakers extends ReactAudioNodeAdapter<
  'Speakers',
  void,
  AudioDestinationNode
> {
  constructor(id: string, context: AudioContext) {
    super('Speakers', id, context.destination)
  }
}
