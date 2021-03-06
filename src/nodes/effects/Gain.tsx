import { Slider } from 'antd'
import React from 'react'
import { ReactNodeComponent } from '../../graph/react/ReactNode'
import { ReactAudioNodeAdapter } from '../ReactAudioNodeAdapter'

interface GainOptions {
  gain: number
}

export class Gain extends ReactAudioNodeAdapter<'Gain', GainOptions, GainNode> {
  public reactComponent = GainReactComponent
  constructor(id: string, context: AudioContext) {
    super('Gain', id, context.createGain())
    this.setOptions({ gain: this.audioNode.gain.value })
  }

  public setOptions(options: Partial<GainOptions>) {
    super.setOptions(options)
    if (this.audioNode) {
      this.audioNode.gain.value = this.options.gain
    }
  }
}

export const GainReactComponent: ReactNodeComponent<GainOptions> = props => {
  const onAfterChange = (value: number) => props.setOptions({ gain: value })
  return (
    <div className="options-ui">
      Gain value
      <Slider
        min={-1}
        max={1}
        defaultValue={props.options.gain}
        onAfterChange={onAfterChange}
        step={0.01}
      />
    </div>
  )
}
