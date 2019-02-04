import React from 'react'
import { Graph } from '../Graph'
import { Node } from '../Node'

export const GraphContext = React.createContext<Graph<Node<any, any>> | null>(
  null
)

export const GraphProvider = GraphContext.Provider
