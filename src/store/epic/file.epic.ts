import { combineEpics } from 'redux-observable'
import { of } from 'rxjs'
import { catchError, filter, flatMap, map } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { AppEpic } from '.'
import { SoundgraphNodeType } from '../../nodes/SoundgraphNode'
import {
  CURRENT_FORMAT_VERSION,
  NodeDefinition
} from '../../services/file.service'
import { flatten } from '../../util'
import { fileActions } from '../actions'

export const FILE_SUFFIX = '.json'

const saveFileEpic: AppEpic = (action$, state, { graph, fileService }) =>
  action$.pipe(
    filter(isActionOf(fileActions.saveFile.request)),
    flatMap(() => {
      const nodes: NodeDefinition[] = graph.getAllNodes().map(node => ({
        id: node.id,
        type: node.type,
        name: node.name,
        position: node.position,
        options: node.options
      }))

      const saved = fileService.saveFile(
        {
          version: CURRENT_FORMAT_VERSION,
          duration: state.value.playback.duration,
          nodes,
          edges: graph.getAllEdges()
        },
        state.value.file.name + FILE_SUFFIX
      )

      return saved ? [fileActions.saveFile.success()] : []
    })
  )

const openFileEpic: AppEpic = (action$, state, { graph, fileService, info }) =>
  action$.pipe(
    filter(isActionOf(fileActions.openFile.request)),
    map(action => {
      const { name, content } = action.payload
      const file = fileService.loadFile(content)
      const fileName = name.toUpperCase().endsWith(FILE_SUFFIX.toUpperCase())
        ? name.substr(0, name.length - FILE_SUFFIX.length)
        : name

      graph.removeAllNodes()
      graph.removeAllEdges()

      const nodes = file.nodes.map(nodeDefinition => {
        const node = graph.createNode(
          nodeDefinition.type as SoundgraphNodeType,
          nodeDefinition.id
        )
        // @ts-ignore
        node.setOptions(nodeDefinition.options)
        node.position = nodeDefinition.position
        node.name = nodeDefinition.name
        return node.getCytoscapeDefinitions()
      })

      file.edges.forEach(graph.addEdge)
      const edges = file.edges.map(graph.getCytoscapeEdgeDefinition)

      return fileActions.openFile.success({
        duration: file.duration,
        fileName,
        edges,
        nodes: flatten(nodes)
      })
    }),
    catchError(err => {
      console.log(err)
      info.errorMessage('' + err)
      return of(fileActions.openFile.failure(err))
    })
  )

export const fileEpic = combineEpics(saveFileEpic, openFileEpic)
