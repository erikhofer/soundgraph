import { combineEpics } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { AppEpic } from '.'
import { Node } from '../../graph/Node'
import { nodeActions } from '../actions'

const createNodeEpic: AppEpic = (action$, _, { graph }) =>
  action$.pipe(
    filter(isActionOf(nodeActions.createNode.request)),
    map(action => graph.createNode(action.payload).getCytoscapeDefinitions()),
    map(nodeActions.createNode.success)
  )

const setNodeOptionsEpic: AppEpic = (action$, _, { graph }) =>
  action$.pipe(
    filter(isActionOf(nodeActions.setNodeOptions.request)),
    map(action => {
      const { id, options } = action.payload
      const node = graph.getNode(id) as Node<any, any>
      node.setOptions(options)
      return node.getCytoscapeDefinitions()
    }),
    map(nodeActions.setNodeOptions.success)
  )

const setNodePositionEpic: AppEpic = (action$, _, { graph }) =>
  action$.pipe(
    filter(isActionOf(nodeActions.setNodePosition.request)),
    map(action => {
      const { id, position } = action.payload
      const node = graph.getNode(id) as Node<any, any>
      node.position = position
      return node.getCytoscapeDefinitions()
    }),
    map(nodeActions.setNodePosition.success)
  )

export const nodeEpic = combineEpics(
  createNodeEpic,
  setNodeOptionsEpic,
  setNodePositionEpic
)
