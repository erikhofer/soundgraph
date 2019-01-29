import { Node, NodeType } from './Node'

export interface NodeFactory<T extends Node<any, any>> {
  createNode(type: NodeType<T>): T
}
