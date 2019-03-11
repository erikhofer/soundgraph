import { Slider } from 'antd'
import React from 'react'
import { ReactNodeComponent } from '../../graph/react/ReactNode'
import { ReactAudioNodeAdapter } from '../ReactAudioNodeAdapter'

interface DelayOptions {
  delay: number
}

export class Delay extends ReactAudioNodeAdapter<
  'Delay',
  DelayOptions,
  DelayNode
> {

  public reactComponent = DelayReactComponent
  constructor(id: string, context: AudioContext) {
    super('Delay', id, context.createDelay(10))
    this.setOptions({ delay: this.audioNode.delayTime.value })
  }

  public setOptions(options: Partial<DelayOptions>) {
    super.setOptions(options)
    if (this.audioNode) {
      this.audioNode.delayTime.value = this.options.delay
    }
  }
}

export const DelayReactComponent: ReactNodeComponent<DelayOptions> = props => {
  const onAfterChange = (value: number) => props.setOptions({ delay: value })
  return (
    <div className="options-ui">
      Delay in seconds
      <Slider
        min={0.0}
        max={10}
        defaultValue={props.options.delay}
        onAfterChange={onAfterChange}
        step={0.1}
      />
    </div>
  )
}
