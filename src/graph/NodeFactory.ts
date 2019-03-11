import { Node, NodeType } from './Node'

export interface NodeFactory<NODE extends Node<any, any>> {
  /**
   * Creates a node of the given type.
   * @param id if `undefined`, generate a unique id
   */
  createNode(type: NodeType<NODE>, id?: string): NODE
}
