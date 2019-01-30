import { FunctionComponent } from 'react'
import { Node } from '../Node'

export abstract class ReactNode<TYPE extends string, OPTIONS> extends Node<
  TYPE,
  OPTIONS & { reactComponentVisible: boolean }
> {
  /**
   * Override to provide additional UI for the node.
   */
  public reactComponent?: FunctionComponent<{
    options: OPTIONS
    updateOptions: (options: OPTIONS) => void
  }>
}
