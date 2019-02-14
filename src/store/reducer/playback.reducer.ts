import { Reducer } from 'react'
import { getType } from 'typesafe-actions'
import { AppAction } from '..'
import { playbackActions } from '../actions'
import { PlaybackState } from '../state/playback.state'

export const playbackReducer: Reducer<PlaybackState, AppAction> = (
  state = {
    status: 'stopped',
    duration: 0
  },
  action
) => {
  switch (action.type) {
    case getType(playbackActions.setPlaybackStatus.success):
      return { ...state, status: action.payload }
    case getType(playbackActions.setPlaybackDuration.success):
      return { ...state, duration: action.payload }
  }
  return state
}
