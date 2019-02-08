import React from 'react'
import { Cy } from '../Graph'

export interface PopperWrapperProps {
  nodeId: string
  cy: Cy
}

/**
 * This is needed because we can only hook up the `ReactNode.reactComponent` to
 * Popper after is has been mounted.
 */
export default class PopperWrapper extends React.Component<PopperWrapperProps> {
  private ref = React.createRef<HTMLDivElement>()

  public render() {
    return <div ref={this.ref}>{this.props.children}</div>
  }

  public componentDidMount() {
    const { cy, nodeId } = this.props
    cy.nodes('#' + nodeId).forEach(node => {
      const popper = (node as any).popper({
        content: () => this.ref.current
      })
      const update = () => {
        popper.scheduleUpdate()
      }
      node.on('position', update)
      cy.on('pan zoom resize', update)
    })
  }
}
