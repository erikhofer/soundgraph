import { NodeDefinition } from 'cytoscape'
import React from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { FooNode } from 'src/nodes/FooNode'

export default class Graph extends React.Component {
  public render() {
    const nodes = [new FooNode(), new FooNode()]

    const elements: NodeDefinition[] = []

    for (const node of nodes) {
      elements.push({
        data: {
          id: node.id,
          label: 'Test'
        }
      })
      for (let i = 0; i < node.numberOfInputs; i++) {
        elements.push({
          data: {
            id: node.id + '-input-' + i,
            parent: node.id,
            label: 'Input ' + i
          },
          position: {
            x: 0,
            y: i * 40
          },
          grabbable: false,
          selectable: false
        })
      }
      for (let i = 0; i < node.numberOfOutputs; i++) {
        elements.push({
          data: {
            id: node.id + '-output-' + i,
            parent: node.id,
            label: 'Output ' + i
          },
          position: {
            x: 100,
            y: i * 40
          },
          grabbable: false,
          selectable: false
        })
      }
    }

    return (
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        pan={{ x: 300, y: 300 }}
      />
    )
  }
}
