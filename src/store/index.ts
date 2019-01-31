import { createStore, Dispatch, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Services } from '../services'
import { AppAction } from './actions'
import { createAppReducer } from './reducer/app.reducer'
import { AppState } from './state/app.state'

export { AppState, AppAction }

export type AppStore = Store<AppState, AppAction>

export function createAppStore(services: Services): AppStore {
  const store = createStore(createAppReducer(), composeWithDevTools())
  return store
}

export interface DispatchProps {
  dispatch: Dispatch<AppAction>
}

export const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  dispatch
})
