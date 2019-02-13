import { ActionType } from 'typesafe-actions'
import * as edgeActions from './edge.actions'
import * as nodeActions from './node.actions'
import * as playingActions from './playing.actions'

export type AppAction =
  | ActionType<typeof playingActions>
  | ActionType<typeof nodeActions>
  | ActionType<typeof edgeActions>

export type AppPayloadAction<P> = AppAction & { payload: P }

export { playingActions, nodeActions, edgeActions }
