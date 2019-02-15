import { createAsyncAction, createStandardAction } from 'typesafe-actions'
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

export const setPlaybackPausedAt = createStandardAction(
  'SET_PLAYBACK_PAUSED_AT'
)<number>()

export const setPlaybackStartTime = createStandardAction(
  'SET_PLAYBACK_START_TIME'
)<number>()
