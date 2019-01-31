import { createAsyncAction, createStandardAction } from 'typesafe-actions'

export interface Content {
  playing: boolean
}

export const playingContent = createAsyncAction(
  'PLAYING_CONTENT_REQUEST',
  'PLAYING_CONTENT_SUCCESS',
  'PLAYING_CONTENT_FAILURE'
)<void, Content, Error>()

export const finishPlaying = createStandardAction('FINISH_PLAYING')()
