import { combineReducers } from 'redux'
import { AppAction, AppState } from '../'
import { playingReducer } from './playing.reducer'

export const createAppReducer = () =>
  combineReducers<AppState, AppAction>({
    playing: playingReducer
  })
