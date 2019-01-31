import {
  combineEpics,
  createEpicMiddleware,
  Epic,
  EpicMiddleware
} from 'redux-observable'
import { Services } from '../../services'
import { AppAction } from '../actions'
import { AppState } from '../state/app.state'

export type AppEpic = Epic<AppAction, AppAction, AppState, Services>

export const appEpic = combineEpics()

export function createAppEpicMiddleware(
  services: Services
): EpicMiddleware<AppAction, AppAction, AppState, Services> {
  return createEpicMiddleware({ dependencies: services })
}
