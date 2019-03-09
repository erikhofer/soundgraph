import { combineEpics } from 'redux-observable'
import { filter, map, tap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { AppEpic } from '.'
import { edgeActions } from '../actions'

const createEdgeEpic: AppEpic = (action$, _, { graph }) =>
  action$.pipe(
    filter(isActionOf(edgeActions.createEdge.request)),
    tap(action => {
      const edge = action.payload
      const source = graph.getNode(edge.sourceNodeId)!
      const destination = graph.getNode(edge.destinationNodeId)!
      source.connect(
        destination,
        edge.sourceOutputIndex,
        edge.destinationInputIndex
      )
    }),
    map(action => graph.addEdge(action.payload)),
    map(edgeActions.createEdge.success)
  )

const deleteEdgeEpic: AppEpic = (action$, _, { graph }) =>
  action$.pipe(
    filter(isActionOf(edgeActions.deleteEdge.request)),
    map(action => graph.removeEdge(action.payload)),
    map(edgeActions.deleteEdge.success)
  )

export const edgeEpic = combineEpics(createEdgeEpic, deleteEdgeEpic)
