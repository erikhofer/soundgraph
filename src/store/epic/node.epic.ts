import { combineEpics } from 'redux-observable'
import { filter, flatMap, map } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { AppEpic } from '.'
import { Node } from '../../graph/Node'
import { nodeActions } from '../actions'

const createNodeEpic: AppEpic = (action$, _, { graph }) =>
  action$.pipe(
    filter(isActionOf(nodeActions.createNode.request)),
    map(action => {
      const { type, options } = action.payload
      const node = graph.createNode(type)
      if (options) {
        // @ts-ignore
        node.setOptions(options)
      }
      return node.getCytoscapeDefinitions()
    }),
    map(nodeActions.createNode.success)
  )

const setNodeOptionsEpic: AppEpic = (action$, _, { graph }) =>
  action$.pipe(
    filter(isActionOf(nodeActions.setNodeOptions.request)),
    map(action => {
      const { id, options } = action.payload
      const node = graph.getNode(id) as Node<any, any>
      node.setOptions(options)
      return { id, cytoscapeDefinition: node.getCytoscapeDefinitions() }
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
      return {
        id,
        cytoscapeDefinition: node.getCytoscapeDefinitions()
      }
    }),
    // map(nodeActions.setNodePosition.success)
    flatMap(() => []) // this prevents position reset bug
  )

const deleteNodeEpic: AppEpic = (action$, _, { graph }) =>
  action$.pipe(
    filter(isActionOf(nodeActions.deleteNode.request)),
    map(action => {
      const node = graph.getNode(action.payload)
      graph.removeNode(action.payload)
      if (node !== undefined) {
        return node.getCytoscapeDefinitions()
      } else {
        map(nodeActions.deleteNode.failure)
        return undefined
      }
    }),
    map(nodeActions.deleteNode.success)
  )

export const nodeEpic = combineEpics(
  createNodeEpic,
  setNodeOptionsEpic,
  setNodePositionEpic,
  deleteNodeEpic
)
