import { createAsyncAction } from 'typesafe-actions'
import { CytoscapeEdgeDefinition, Edge } from '../../graph/Edge'

export const createEdge = createAsyncAction(
  'CREATE_EDGE_REQUEST',
  'CREATE_EDGE_SUCCESS',
  'CREATE_EDGE_FAILURE'
)<Edge, CytoscapeEdgeDefinition, Error>()

export const deleteEdge = createAsyncAction(
  'DELETE_EDGE_REQUEST',
  'DELETE_EDGE_SUCCESS',
  'DELETE_EDGE_FAILURE'
)<Edge, CytoscapeEdgeDefinition, Error>()
