import Cytoscape from 'cytoscape'
import CytoscapeEdgehandles from 'cytoscape-edgehandles'
import { Edge } from './Edge'
import { Node, NodeType } from './Node'
import { NodeFactory } from './NodeFactory'

Cytoscape.use(CytoscapeEdgehandles)

export class Graph<NODE extends Node<any, any>> {
  private nodes = new Map<string, NODE>()
  // @ts-ignore
  private edges: Edge[] = []

  public constructor(private readonly nodeFactory: NodeFactory<NODE>) {}

  public createNode(type: NodeType<NODE>) {
    const node = this.nodeFactory.createNode(type)
    this.nodes.set(node.id, node)
    return node
  }

  public getNode(id: string) {
    return this.nodes.get(id)
  }

  public removeNode(id: string) {
    //
  }
}

/**
 * Cytograph instance
 */
export interface Cy extends Cytoscape.Core {
  edgehandles(settings: any): any
}

const cytoscapeEdgehandlesStyles: Cytoscape.Stylesheet[] = [
  {
    selector: '.eh-handle',
    style: {
      'background-color': 'red',
      width: 12,
      height: 12,
      shape: 'ellipse',
      'overlay-opacity': 0,
      'border-width': 12, // makes the handle easier to hit
      'border-opacity': 0
    }
  },
  {
    selector: '.eh-hover',
    style: {
      'background-color': 'red'
    }
  },
  {
    selector: '.eh-source',
    style: {
      'border-width': 2,
      'border-color': 'red'
    }
  },
  {
    selector: '.eh-target',
    style: {
      'border-width': 2,
      'border-color': 'red'
    }
  },
  {
    selector: '.eh-preview, .eh-ghost-edge',
    style: {
      'background-color': 'red',
      'line-color': 'red',
      'target-arrow-color': 'red',
      'source-arrow-color': 'red'
    }
  },
  {
    selector: '.eh-ghost-edge.eh-preview-active',
    style: {
      opacity: 0
    }
  }
]

export const cytoscapeStyle: Cytoscape.Stylesheet[] = [
  {
    selector: 'node[type]',
    style: {
      shape: 'data(type)',
      height: 20,
      width: 20
    }
  },
  {
    selector: 'node[points]',
    style: {
      'shape-polygon-points': 'data(points)'
    }
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'unbundled-bezier',
      'control-point-distances': [40, -40],
      'control-point-weights': [0.25, 0.75],
      'target-arrow-shape': 'triangle'
    } as any
  },
  ...cytoscapeEdgehandlesStyles
]

// see https://github.com/cytoscape/cytoscape.js-edgehandles
export const cytoscapeEdgehandlesSettings = {
  handleNodes: 'node[output]',
  edgeType(sourceNode: any, targetNode: any) {
    const target = targetNode._private
    const source = sourceNode._private
    if (target && source && target.data && source.data) {
      if (target.data.input && target.data.parent !== source.data.parent) {
        return 'flat'
      }
    }
    return null
  },
  handlePosition(node: any) {
    return 'middle center'
  }
}
