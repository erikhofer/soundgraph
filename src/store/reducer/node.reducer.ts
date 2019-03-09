import { Reducer } from 'react'
import { getType } from 'typesafe-actions'
import { AppAction } from '..'
import { CytoscapeNodeDefinition } from '../../graph/Node'
import { nodeActions } from '../actions'

export const nodeReducer: Reducer<CytoscapeNodeDefinition[], AppAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case getType(nodeActions.createNode.success):
      return [...state, ...action.payload]
    case getType(nodeActions.setNodePosition.success):
      // Cytoscape already mutates the state (yeah...), we can't do it again
      // here because that somehow breaks everything
      return state
    case getType(nodeActions.setNodeOptions.success): {
      return [
        ...removeNode(action.payload.id, state),
        ...action.payload.cytoscapeDefinition
      ]
    }
  }
  return state
}

const removeNode = (id: string, state: CytoscapeNodeDefinition[]) =>
  state.filter(d => d.data.id !== id && d.data.parent !== id)
