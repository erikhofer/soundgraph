import { ReactNode } from '../graph/react/ReactNode'

export abstract class ReactAudioNode<TYPE extends string, OPTIONS>
  extends ReactNode<TYPE, OPTIONS>
  implements AudioNode {
  public abstract channelCount: number
  public abstract channelCountMode: ChannelCountMode
  public abstract channelInterpretation: ChannelInterpretation
  public abstract context: BaseAudioContext

  public abstract connect(
    destinationNode: AudioNode,
    output?: number | undefined,
    input?: number | undefined
  ): AudioNode
  public abstract connect(
    destinationParam: AudioParam,
    output?: number | undefined
  ): void

  public abstract disconnect(output?: number): void
  public abstract disconnect(
    destinationNode: AudioNode,
    output?: number,
    input?: number
  ): void
  public abstract disconnect(
    destinationParam: AudioParam,
    output?: number
  ): void

  public abstract addEventListener(
    type: string,
    listener: EventListener | EventListenerObject | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void

  public abstract dispatchEvent(event: Event): boolean

  public abstract removeEventListener(
    type: string,
    callback: EventListener | EventListenerObject | null,
    options?: boolean | EventListenerOptions | undefined
  ): void
}
