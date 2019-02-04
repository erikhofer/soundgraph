import Cytograph from 'cytoscape'
import { Edge } from './Edge'
import { Node, NodeType } from './Node'
import { NodeFactory } from './NodeFactory'

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

export const cytographStyle: Cytograph.Stylesheet[] = [
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
  }
]
