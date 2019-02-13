import { combineReducers } from 'redux'
import { AppAction, AppState } from '../'
import { edgeReducer } from './edge.reducer'
import { nodeReducer } from './node.reducer'
import { playingReducer } from './playing.reducer'

export const createAppReducer = () =>
  combineReducers<AppState, AppAction>({
    playing: playingReducer,
    nodes: nodeReducer,
    edges: edgeReducer
  })
