import { Reducer } from 'react'
import { getType } from 'typesafe-actions'
import { AppAction } from '..'
import {
  edgeActions,
  fileActions,
  nodeActions,
  playbackActions
} from '../actions'
import { FileState } from '../state/file.state'

export const fileReducer: Reducer<FileState, AppAction> = (
  state = {
    name: 'unnamed',
    changed: false
  },
  action
) => {
  switch (action.type) {
    case getType(fileActions.setFileName):
      return { ...state, name: action.payload }
    case getType(playbackActions.setPlaybackDuration.success):
    case getType(nodeActions.createNode.success):
    case getType(nodeActions.deleteNode.success):
    case getType(nodeActions.setNodeOptions.success):
    case getType(nodeActions.setNodePosition.success):
    case getType(edgeActions.createEdge.success):
    case getType(edgeActions.deleteEdge.success):
      return { ...state, changed: true }
    case getType(fileActions.newFile.success):
    case getType(fileActions.saveFile.success):
      return { ...state, changed: false }
    case getType(fileActions.openFile.success):
      return { ...state, changed: false, name: action.payload.fileName }
  }
  return state
}
