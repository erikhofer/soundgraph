import { ActionType } from 'typesafe-actions'
import * as edgeActions from './edge.actions'
import * as nodeActions from './node.actions'
import * as playbackActions from './playback.actions'

export type AppAction =
  | ActionType<typeof playbackActions>
  | ActionType<typeof nodeActions>
  | ActionType<typeof edgeActions>

export type AppPayloadAction<P> = AppAction & { payload: P }

export { playbackActions, nodeActions, edgeActions }
