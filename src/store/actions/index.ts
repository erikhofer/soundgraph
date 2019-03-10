import { ActionType } from 'typesafe-actions'
import * as edgeActions from './edge.actions'
import * as fileActions from './file.actions'
import * as nodeActions from './node.actions'
import * as playbackActions from './playback.actions'

export type AppAction =
  | ActionType<typeof playbackActions>
  | ActionType<typeof nodeActions>
  | ActionType<typeof edgeActions>
  | ActionType<typeof fileActions>

export type AppPayloadAction<P> = AppAction & { payload: P }

export { playbackActions, nodeActions, edgeActions, fileActions }
