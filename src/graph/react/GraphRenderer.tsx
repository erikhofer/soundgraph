import { NodeDefinition } from 'cytoscape'
import React from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { Node } from '../Node'

export interface GraphProps {
  nodes: Array<Node<any>>
}

export default class GraphRenderer extends React.Component<GraphProps> {
  public render() {
    const test = process && process.env && process.env.NODE_ENV === 'test'
    if (test) {
      // https://github.com/plotly/react-cytoscapejs/issues/13
      return null
    }

    const elements: NodeDefinition[] = this.props.nodes
      .map(n => n.cytoscapeDefinitions)
      .reduce((d1, d2) => d1.concat(d2), [])

    return (
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        pan={{ x: 300, y: 300 }}
        headless
      />
    )
  }
}
