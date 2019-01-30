import { Node, NodeType } from './Node'

export interface NodeFactory<NODE extends Node<any, any>> {
  createNode(type: NodeType<NODE>): NODE
}
