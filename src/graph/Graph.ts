import Cytoscape from 'cytoscape'
import CytoscapeCxtmenu from 'cytoscape-cxtmenu'
import CytoscapeEdgehandles from 'cytoscape-edgehandles'
import 'font-awesome/css/font-awesome.css'
import {
  CytoscapeEdgeDefinition,
  Edge,
  edgeEquals,
  getEdgeId,
  isConnectedToNode
} from './Edge'
import { Node, NodeType } from './Node'
import { NodeFactory } from './NodeFactory'

Cytoscape.use(CytoscapeEdgehandles)
Cytoscape.use(CytoscapeCxtmenu)

export class Graph<NODE extends Node<any, any>> {
  private nodes = new Map<string, NODE>()
  private edges: Edge[] = []

  public constructor(private readonly nodeFactory: NodeFactory<NODE>) {}

  public createNode = (type: NodeType<NODE>, id?: string) => {
    const node = this.nodeFactory.createNode(type, id)
    this.nodes.set(node.id, node)
    return node
  }

  public getNode = (id: string) => {
    return this.nodes.get(id)
  }

  public getAllNodes = () => {
    return Array.from(this.nodes.values())
  }

  public getAllEdges = () => {
    return [...this.edges]
  }

  public removeNode = (id: string) => {
    this.nodes.delete(id)
    this.edges = this.edges.filter(e => !isConnectedToNode(e, id))
  }

  public removeAllNodes = () => {
    this.nodes.forEach((_, id) => this.removeNode(id))
  }

  public addEdge = (edge: Edge) => {
    this.edges.push(edge)
    return this.getCytoscapeEdgeDefinition(edge)
  }

  public removeEdge = (edge: Edge) => {
    this.edges.filter(e => !edgeEquals(e, edge))
    return getEdgeId(edge)
  }

  public removeAllEdges = () => {
    this.edges = []
  }

  public getCytoscapeEdgeDefinition(edge: Edge): CytoscapeEdgeDefinition {
    return {
      data: {
        id: getEdgeId(edge),
        source: `${edge.sourceNodeId}-output-${edge.sourceOutputIndex}`,
        target: `${edge.destinationNodeId}-input-${edge.destinationInputIndex}`
      }
    }
  }
}

/**
 * Cytograph instance
 */
export interface Cy extends Cytoscape.Core {
  edgehandles(settings: any): any
  cxtmenu(settings: any): any
}

const cytoscapeEdgehandlesStyles: Cytoscape.Stylesheet[] = [
  {
    selector: '.eh-handle',
    style: {
      'background-color': 'red',
      // make the handle invisble because there is a bug where it's not removed on mouse-out
      'background-opacity': 0,
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
    selector: 'node[root]',
    style: {
      label: 'data(label)'
    }
  },
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
    if (
      targetNode.data('input') &&
      targetNode.data('parent') !== sourceNode.data('parent')
    ) {
      return 'flat'
    }
    return null
  },
  handlePosition(node: any) {
    return 'middle center'
  }
}

export const cytoscapeCxtmenuSettings = {
  nodes: (deleteNode: (id: string) => void) => ({
    selector: 'node[root]',
    commands: [
      {
        content: '<span class="fa fa-trash fa-2x"></span>',
        select(ele: any) {
          // Event gets raised multiple times and _.debounce doensn't work
          if (lastDeleteNodeTime + 200 > Date.now()) {
            return
          }
          lastDeleteNodeTime = Date.now()
          deleteNode(ele.id())
        }
      }
    ]
  }),
  edges: (deleteEdge: (edege: Edge) => void) => ({
    selector: 'edge',
    commands: [
      {
        content: '<span class="fa fa-trash fa-2x"></span>',
        select: (ele: any) => {
          // Event gets raised multiple times and _.debounce doensn't work
          if (lastDeleteEdgeTime + 200 > Date.now()) {
            return
          }
          lastDeleteEdgeTime = Date.now()
          deleteEdge({
            sourceNodeId: ele.data('source').slice(0, -9),
            sourceOutputIndex: parseInt(ele.data('source').slice(-1), 10),
            destinationNodeId: ele.data('target').slice(0, -8),
            destinationInputIndex: parseInt(ele.data('target').slice(-1), 10)
          })
        }
      }
    ]
  })
}

let lastDeleteNodeTime = 0
let lastDeleteEdgeTime = 0
