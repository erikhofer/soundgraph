import { ReactAudioNode } from './ReactAudioNode'

export class ReactAudioNodeAdapter<
  TYPE extends string,
  OPTIONS,
  NODE extends AudioNode
> extends ReactAudioNode<TYPE, OPTIONS> {
  public constructor(
    type: TYPE,
    id: string,
    protected readonly audioNode: NODE
  ) {
    super(type, id)
  }

  public get numberOfInputs() {
    return this.audioNode.numberOfInputs
  }

  public get numberOfOutputs() {
    return this.audioNode.numberOfOutputs
  }

  public get channelCount() {
    return this.audioNode.channelCount
  }

  public get channelCountMode() {
    return this.audioNode.channelCountMode
  }

  public get channelInterpretation() {
    return this.audioNode.channelInterpretation
  }

  public get context() {
    return this.audioNode.context
  }

  public connect(
    destinationNode: AudioNode,
    output?: number | undefined,
    input?: number | undefined
  ): AudioNode
  public connect(
    destinationParam: AudioParam,
    output?: number | undefined
  ): void
  public connect(destination: any, output?: any, input?: any) {
    return this.audioNode.connect(destination, output, input)
  }

  public disconnect(output?: number): void
  public disconnect(
    destinationNode: AudioNode,
    output?: number,
    input?: number
  ): void
  public disconnect(destinationParam: AudioParam, output?: number): void
  public disconnect(destination?: any, output?: any, input?: any) {
    return this.audioNode.disconnect(destination, output, input)
  }

  public addEventListener(
    type: string,
    listener: EventListener | EventListenerObject | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void {
    return this.audioNode.addEventListener(type, listener, options)
  }

  public dispatchEvent(event: Event): boolean {
    return this.audioNode.dispatchEvent(event)
  }

  public removeEventListener(
    type: string,
    callback: EventListener | EventListenerObject | null,
    options?: boolean | EventListenerOptions | undefined
  ): void {
    return this.audioNode.removeEventListener(type, callback, options)
  }
}
