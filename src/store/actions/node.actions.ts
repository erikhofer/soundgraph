import { createAsyncAction } from 'typesafe-actions'
import { CytoscapeNodeDefinition } from '../../graph/Node'
import { Point } from '../../graph/Util'
import { SoundgraphNodeType } from '../../nodes/SoundgraphNode'

export const createNode = createAsyncAction(
  'CREATE_NODE_REQUEST',
  'CREATE_NODE_SUCCESS',
  'CREATE_NODE_FAILURE'
)<SoundgraphNodeType, CytoscapeNodeDefinition[], Error>()

export const setNodeOptions = createAsyncAction(
  'SET_NODE_OPTIONS_REQUEST',
  'SET_NODE_OPTIONS_SUCCESS',
  'SET_NODE_OPTIONS_FAILURE'
)<{ id: string; options: any }, CytoscapeNodeDefinition[], Error>()

export const setNodePosition = createAsyncAction(
  'SET_NODE_POSITION_REQUEST',
  'SET_NODE_POSITION_SUCCESS',
  'SET_NODE_POSITION_FAILURE'
)<{ id: string; position: Point }, CytoscapeNodeDefinition[], Error>()

export const deleteNode = createAsyncAction(
  'DELETE_NODE_REQUEST',
  'DELETE_NODE_SUCCESS',
  'DELETE_NODE_FAILURE'
)<string, CytoscapeNodeDefinition[], Error>()
