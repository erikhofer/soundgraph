import Cytoscape, { CytoscapeOptions } from 'cytoscape'
import React from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { CytoscapeNodeDefinition } from '../Node'

export interface GraphProps {
  nodes: CytoscapeNodeDefinition[]
}

export default class ReactGraph extends React.Component<GraphProps> {
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
      <CytoscapeComponent
        {...cytoscapeOptions}
        cy={this.connectCytoscape}
        style={{ width: '100%', height: '100%' }}
      />
    )
  }

  private connectCytoscape = (cy: Cytoscape.Core) => {
    //
  }
}
