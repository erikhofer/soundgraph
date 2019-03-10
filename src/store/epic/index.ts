import {
  combineEpics,
  createEpicMiddleware,
  Epic,
  EpicMiddleware
} from 'redux-observable'
import { Services } from '../../services'
import { AppAction } from '../actions'
import { AppState } from '../state/app.state'
import { edgeEpic } from './edge.epic'
import { fileEpic } from './file.epic'
import { nodeEpic } from './node.epic'
import { playbackEpic } from './playback.epic'

export type AppEpic = Epic<AppAction, AppAction, AppState, Services>

export const appEpic = combineEpics(nodeEpic, edgeEpic, playbackEpic, fileEpic)

export function createAppEpicMiddleware(
  services: Services
): EpicMiddleware<AppAction, AppAction, AppState, Services> {
  return createEpicMiddleware({ dependencies: services })
}
