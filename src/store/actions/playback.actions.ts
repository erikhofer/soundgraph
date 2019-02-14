import { createAsyncAction } from 'typesafe-actions'
import { PlaybackStatus } from '../state/playback.state'

export const setPlaybackStatus = createAsyncAction(
  'SET_PLAYBACK_STATUS_REQUEST',
  'SET_PLAYBACK_STATUS_SUCCESS',
  'SET_PLAYBACK_STATUS_FAILURE'
)<PlaybackStatus, PlaybackStatus, Error>()

export const setPlaybackDuration = createAsyncAction(
  'SET_PLAYBACK_DURATION_REQUEST',
  'SET_PLAYBACK_DURATION_SUCCESS',
  'SET_PLAYBACK_DURATION_FAILURE'
)<number, number, Error>()
