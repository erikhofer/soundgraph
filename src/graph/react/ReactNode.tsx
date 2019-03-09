import { Button } from 'antd'
import { FunctionComponent } from 'react'
import React from 'react'
import { Node } from '../Node'

export type ReactNodeComponent<OPTIONS> = FunctionComponent<{
  options: OPTIONS
  setOptions: (options: OPTIONS) => void
}>

export interface ReactNodeOptions {
  reactComponentVisible: boolean
}

export abstract class ReactNode<TYPE extends string, OPTIONS> extends Node<
  TYPE,
  OPTIONS & ReactNodeOptions
> {
  /**
   * Override to provide additional UI for the node.
   */
  public reactComponent?: ReactNodeComponent<OPTIONS>

  public reactComponentWrapper: ReactNodeComponent<
    ReactNodeOptions
  > = props => {
    const visible = props.options.reactComponentVisible
    const toggle = () => props.setOptions({ reactComponentVisible: !visible })
    return (
      <div style={{ marginTop: -7 }}>
        <div style={{ textAlign: 'center' }}>
          <Button
            shape="circle"
            type="dashed"
            icon={visible ? 'caret-down' : 'caret-up'}
            onClick={toggle}
          />
        </div>
        {visible ? props.children : null}
      </div>
    )
  }
}
