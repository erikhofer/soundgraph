import { createAsyncAction } from 'typesafe-actions'
import { CytoscapeNodeDefinition } from '../../graph/Node'
import { SoundgraphNodeType } from '../../nodes/SoundgraphNode'

export const createNode = createAsyncAction(
  'CREATE_NODE_REQUEST',
  'CREATE_NODE_SUCCESS',
  'CREATE_NODE_FAILURE'
)<SoundgraphNodeType, CytoscapeNodeDefinition[], Error>()
