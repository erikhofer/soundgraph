import { Select, Slider } from 'antd'
import React from 'react'
import { ReactNodeComponent } from '../../graph/react/ReactNode'
import { PROTECTED_SPACE } from '../../util'
import { ReactAudioNodeAdapter } from '../ReactAudioNodeAdapter'

const Option = Select.Option

type OscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle'

interface OscillatorOptions {
  frequency: number
  type: OscillatorType
}

export class Oscillator extends ReactAudioNodeAdapter<
  'Oscillator',
  OscillatorOptions,
  OscillatorNode
> {
  public reactComponent = OscillatorReactComponent
  constructor(id: string, context: AudioContext) {
    super('Oscillator', id, context.createOscillator())
    this.setOptions({
      frequency: this.audioNode.frequency.value,
      type: 'sine'
    })
    this.audioNode.start()
  }

  public setOptions(options: Partial<OscillatorOptions>) {
    super.setOptions(options)
    if (this.audioNode) {
      this.audioNode.frequency.value = this.options.frequency
      this.audioNode.type = this.options.type
    }
  }
}

export const OscillatorReactComponent: ReactNodeComponent<
  OscillatorOptions
> = props => {
  const changeFrequency = (value: number) =>
    props.setOptions({ frequency: value })
  const changeType = (value: OscillatorType) => {
    props.setOptions({ type: value })
  }

  return (
    <div className="options-ui">
      Frequency in Hz
      <Slider
        min={20}
        max={8000}
        defaultValue={440}
        onAfterChange={changeFrequency}
        step={1}
      />
      Wave type {PROTECTED_SPACE}
      <Select defaultValue="sine" style={{ width: 120 }} onChange={changeType}>
        <Option value="sine">sine</Option>
        <Option value="square">square</Option>
        <Option value="sawtooth">sawtooth</Option>
        <Option value="triangle">triangle</Option>
      </Select>
    </div>
  )
}
