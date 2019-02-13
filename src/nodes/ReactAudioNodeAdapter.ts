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
    return this.audioNode.connect(
      this.getNativeDestination(destination),
      output,
      input
    )
  }

  public disconnect(output?: number): void
  public disconnect(
    destinationNode: AudioNode,
    output?: number,
    input?: number
  ): void
  public disconnect(destinationParam: AudioParam, output?: number): void
  public disconnect(destination?: any, output?: any, input?: any) {
    return this.audioNode.disconnect(
      this.getNativeDestination(destination),
      output,
      input
    )
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

  /**
   * The AudioNode interface does not work like an interface in _real_ programming languages.
   * This breaks the adapter pattern, we need to get the actual native AudioNode for (dis)connect.
   */
  private getNativeDestination(destination: any) {
    if (destination instanceof ReactAudioNodeAdapter) {
      return destination.audioNode
    }
    return destination
  }
}
