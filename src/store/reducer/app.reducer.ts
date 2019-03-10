import { combineReducers } from 'redux'
import { AppAction, AppState } from '../'
import { edgeReducer } from './edge.reducer'
import { fileReducer } from './file.reducer'
import { nodeReducer } from './node.reducer'
import { playbackReducer } from './playback.reducer'

export const createAppReducer = () =>
  combineReducers<AppState, AppAction>({
    nodes: nodeReducer,
    edges: edgeReducer,
    playback: playbackReducer,
    file: fileReducer
  })
