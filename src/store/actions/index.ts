import { ActionType } from 'typesafe-actions'
import * as playingActions from './playing.actions'

export type AppAction = ActionType<typeof playingActions>

export type AppPayloadAction<P> = AppAction & { payload: P }

export { playingActions }
