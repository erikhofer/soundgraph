import { FunctionComponent } from 'react'
import { Node } from '../Node'

export type ReactNodeComponent<OPTIONS> = FunctionComponent<{
  options: OPTIONS
  setOptions: (options: OPTIONS) => void
}>

export abstract class ReactNode<TYPE extends string, OPTIONS> extends Node<
  TYPE,
  OPTIONS & { reactComponentVisible: boolean }
> {
  /**
   * Override to provide additional UI for the node.
   */
  public reactComponent?: ReactNodeComponent<OPTIONS>
}
