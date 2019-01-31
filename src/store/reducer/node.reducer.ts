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
  }
  return state
}
