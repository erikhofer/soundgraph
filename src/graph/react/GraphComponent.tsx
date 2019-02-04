import Cytoscape, { CytoscapeOptions } from 'cytoscape'
import Popper from 'cytoscape-popper'
import React from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { cytographStyle } from '../Graph'
import { CytoscapeNodeDefinition } from '../Node'
import { GraphContext } from './GraphContext'
import PopperWrapper from './PopperWrapper'
import { ReactNode } from './ReactNode'

Cytoscape.use(Popper)

export interface GraphComponentProps {
  nodes: CytoscapeNodeDefinition[]
  /**
   * Called if the `reactComponent` of a `ReactNode` calls `setOptions()`.
   * If not set, `setOptions()` of the node is called directly.
   */
  setOptions?: (id: string, options: any) => void
}

export default class GraphComponent extends React.Component<
  GraphComponentProps
> {
  public static readonly contextType = GraphContext

  public context!: React.ContextType<typeof GraphContext>
  private cy: Cytoscape.Core

  public render() {
    const test = process && process.env && process.env.NODE_ENV === 'test'
    if (test) {
      // https://github.com/plotly/react-cytoscapejs/issues/13
      return null
    }

    const cytoscapeOptions: CytoscapeOptions = {
      elements: this.props.nodes,
      pan: { x: 300, y: 300 }
    }

    return (
      <React.Fragment>
        <CytoscapeComponent
          {...cytoscapeOptions}
          stylesheet={cytographStyle}
          cy={this.connectCytoscape}
          style={{ width: '100%', height: '100%' }}
        />
        {this.renderReactNodeComponents()}
      </React.Fragment>
    )
  }

  private renderReactNodeComponents() {
    // At this point we need to access the graph directly in order to retrieve
    // the React components. These cannot be stored in Redux.
    const graph = this.context
    if (graph === null) {
      return null
    }

    const nodes = this.props.nodes
      .filter(node => node.data.parent === undefined)
      .map(node => graph.getNode(node.data.id!))

    const components: React.ReactNode[] = []
    for (const node of nodes) {
      if (node instanceof ReactNode) {
        if (node.reactComponent) {
          const setOptions = (options: any) =>
            this.props.setOptions
              ? this.props.setOptions(node.id, options)
              : node.setOptions(options)
          components.push(
            <PopperWrapper cy={this.cy} key={node.id} nodeId={node.id}>
              <node.reactComponent
                options={node.options}
                setOptions={setOptions}
              />
            </PopperWrapper>
          )
        }
      }
    }
    return components
  }

  private connectCytoscape = (cy: Cytoscape.Core) => {
    // setState() would refresh the component and we end up here again
    this.cy = cy
  }
}
