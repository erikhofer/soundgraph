import { Reducer } from 'react'
import { getType } from 'typesafe-actions'
import { AppAction } from '..'
import { playbackActions } from '../actions'
import { PlaybackState } from '../state/playback.state'

export const playbackReducer: Reducer<PlaybackState, AppAction> = (
  state = {
    status: 'stopped',
    duration: 60 * 1000,
    pausedAt: 0,
    startTime: 0
  },
  action
) => {
  switch (action.type) {
    case getType(playbackActions.setPlaybackStatus.success):
      return { ...state, status: action.payload }
    case getType(playbackActions.setPlaybackDuration.success):
      return { ...state, duration: action.payload }
    case getType(playbackActions.setPlaybackPausedAt):
      return { ...state, pausedAt: action.payload }
    case getType(playbackActions.setPlaybackStartTime):
      return { ...state, startTime: action.payload }
  }
  return state
}
