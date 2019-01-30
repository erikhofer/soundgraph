import { Edge } from './Edge'
import { Node, NodeType } from './Node'
import { NodeFactory } from './NodeFactory'

export class Graph<NODE extends Node<any, any>> {
  // @ts-ignore
  private nodes: NODE[] = []
  // @ts-ignore
  private edges: Edge[] = []

  public constructor(private readonly nodeFactory: NodeFactory<NODE>) {}

  public addNode(type: NodeType<NODE>) {
    const node = this.nodeFactory.createNode(type)
    return node
  }

  public removeNode(id: string) {
    //
  }
}
