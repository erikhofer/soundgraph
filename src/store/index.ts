import { applyMiddleware, createStore, Dispatch, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Services } from '../services'
import { AppAction } from './actions'
import { appEpic, createAppEpicMiddleware } from './epic'
import { createAppReducer } from './reducer/app.reducer'
import { AppState } from './state/app.state'

export { AppState, AppAction }

export type AppStore = Store<AppState, AppAction>

export function createAppStore(services: Services): AppStore {
  const epicMiddleware = createAppEpicMiddleware(services)
  const store = createStore(
    createAppReducer(),
    composeWithDevTools(applyMiddleware(epicMiddleware))
  )
  epicMiddleware.run(appEpic)
  return store
}

export interface DispatchProps {
  dispatch: Dispatch<AppAction>
}

export const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  dispatch
})