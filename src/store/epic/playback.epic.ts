import { combineEpics } from 'redux-observable'
import { filter, map, tap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { AppEpic } from '.'
import { playbackActions } from '../actions'

const setPlaybackStatusEpic: AppEpic = (action$, _, { audioContext }) =>
  action$.pipe(
    filter(isActionOf(playbackActions.setPlaybackStatus.request)),
    tap(action => {
      const status = action.payload
      if (status === 'running') {
        audioContext.resume()
      } else {
        audioContext.suspend()
      }
    }),
    map(action => action.payload),
    map(playbackActions.setPlaybackStatus.success)
  )

export const playbackEpic = combineEpics(setPlaybackStatusEpic)
