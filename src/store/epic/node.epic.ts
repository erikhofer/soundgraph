import { combineEpics } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { AppEpic } from '.'
import { nodeActions } from '../actions'

const createNodeEpic: AppEpic = (action$, _, { graph }) =>
  action$.pipe(
    filter(isActionOf(nodeActions.createNode.request)),
    map(action => graph.addNode(action.payload).cytoscapeDefinitions),
    map(nodeActions.createNode.success)
  )

export const nodeEpic = combineEpics(createNodeEpic)
