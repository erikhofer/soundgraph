import { Reducer } from 'react'
import { getType } from 'typesafe-actions'
import { AppAction } from '..'
import { CytoscapeEdgeDefinition } from '../../graph/Edge'
import { edgeActions } from '../actions'

export const edgeReducer: Reducer<CytoscapeEdgeDefinition[], AppAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case getType(edgeActions.createEdge.success):
      return [...state, action.payload]
  }
  return state
}
