import { Slider } from 'antd'
import React from 'react'
import { ReactNodeComponent } from '../../graph/react/ReactNode'
import { ReactAudioNodeAdapter } from '../ReactAudioNodeAdapter'

interface GainOptions {
  gain: number
}

export class Gain extends ReactAudioNodeAdapter<'Gain', GainOptions, GainNode> {
  constructor(id: string, context: AudioContext) {
    super('Gain', id, context.createGain())
    this.setOptions({ gain: this.audioNode.gain.value })
  }

  public reactComponent: ReactNodeComponent<GainOptions> = props => {
    const onAfterChange = (value: number) => props.setOptions({ gain: value })
    return (
      <div className="options-ui">
        <Slider
          min={-3.4}
          max={3.4}
          defaultValue={props.options.gain}
          onAfterChange={onAfterChange}
          step={0.01}
        />
      </div>
    )
  }

  public setOptions(options: Partial<GainOptions>) {
    super.setOptions(options)
    if (this.audioNode) {
      this.audioNode.gain.value = this.options.gain
    }
  }
}
