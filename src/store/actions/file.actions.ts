import { createAsyncAction, createStandardAction } from 'typesafe-actions'
import { CytoscapeEdgeDefinition } from '../../graph/Edge'
import { CytoscapeNodeDefinition } from '../../graph/Node'

export const setFileName = createStandardAction('SET_FILE_NAME')<string>()

export const saveFile = createAsyncAction(
  'SAVE_FILE_REQUEST',
  'SAVE_FILE_SUCCESS',
  'SAVE_FILE_FAILURE'
)<void, void, Error>()

export const openFile = createAsyncAction(
  'OPEN_FILE_REQUEST',
  'OPEN_FILE_SUCCESS',
  'OPEN_FILE_FAILURE'
)<
  { content: string; name: string },
  {
    fileName: string
    duration: number
    nodes: CytoscapeNodeDefinition[]
    edges: CytoscapeEdgeDefinition[]
  },
  Error
>()

export const newFile = createAsyncAction(
  'NEW_FILE_REQUEST',
  'NEW_FILE_SUCCESS',
  'NEW_FILE_FAILURE'
)<void, void, Error>()
