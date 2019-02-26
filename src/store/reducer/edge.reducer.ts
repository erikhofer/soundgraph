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
    case getType(edgeActions.deleteEdge.success):
      console.log('alter: ' + state)
      console.log(state)
      const removeIndex = state.findIndex(
        obj => obj.data.id === action.payload.data.id
      )
      state.splice(removeIndex, 1)
      console.log('neuer: ' + state)
      console.log(state)
      return state
  }
  return state
}
