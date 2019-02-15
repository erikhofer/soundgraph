import { combineEpics } from 'redux-observable'
import { filter, flatMap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { AppEpic } from '.'
import { AppAction, playbackActions } from '../actions'

const KEY_DURATION_REACHED = 'DURATION_REACHED'

const setPlaybackStatusEpic: AppEpic = (
  action$,
  state$,
  { audioContext, scheduler }
) =>
  action$.pipe(
    filter(isActionOf(playbackActions.setPlaybackStatus.request)),
    flatMap(action => {
      const status = action.payload
      const state = state$.value.playback
      if (status === state.status) {
        return [] // only do something if status is actually changed
      }
      const actionsToDispatch: AppAction[] = [
        playbackActions.setPlaybackStatus.success(status)
      ]

      if (status === 'running') {
        const startTime = new Date().getTime()
        scheduler.scheduleAction(
          KEY_DURATION_REACHED,
          playbackActions.setPlaybackStatus.request('stopped'),
          state.duration - state.pausedAt
        )
        audioContext.resume()
        actionsToDispatch.push(playbackActions.setPlaybackStartTime(startTime))
      } else {
        if (status === 'paused') {
          const pausedAt =
            new Date().getTime() - state.startTime + state.pausedAt
          actionsToDispatch.push(playbackActions.setPlaybackPausedAt(pausedAt))
        } else {
          actionsToDispatch.push(playbackActions.setPlaybackPausedAt(0))
        }
        scheduler.cancel(KEY_DURATION_REACHED)
        audioContext.suspend()
      }
      return actionsToDispatch
    })
  )

const setPlaybackDurationEpic: AppEpic = (action$, state$, { scheduler }) =>
  action$.pipe(
    filter(isActionOf(playbackActions.setPlaybackDuration.request)),
    flatMap(action => {
      const duration = action.payload
      const { status, startTime, pausedAt } = state$.value.playback
      const actionsToDispatch: AppAction[] = [
        playbackActions.setPlaybackDuration.success(duration)
      ]

      if (status === 'running') {
        scheduler.cancel(KEY_DURATION_REACHED)
        const now = new Date().getTime()
        const elapsedTime = now - startTime
        // if the elapsed time is already exceeding the new duration, this will
        // trigger a stop action immediately
        scheduler.scheduleAction(
          KEY_DURATION_REACHED,
          playbackActions.setPlaybackStatus.request('stopped'),
          duration - pausedAt - elapsedTime
        )
      } else if (status === 'paused' && pausedAt >= duration) {
        actionsToDispatch.push(playbackActions.setPlaybackPausedAt(0))
      }
      return actionsToDispatch
    })
  )

export const playbackEpic = combineEpics(
  setPlaybackStatusEpic,
  setPlaybackDurationEpic
)
