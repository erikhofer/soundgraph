import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { Graph } from './graph/Graph'
import './index.scss'
import { SoundgraphNodeFactory } from './nodes/SoundgraphNodeFactory'
import registerServiceWorker from './registerServiceWorker'
import { Services } from './services'
import { antDesignInfo } from './services'
import { createAppStore } from './store'

const audioContext = new AudioContext()
const nodeFactory = new SoundgraphNodeFactory(audioContext)
const graph = new Graph(nodeFactory)

const services: Services = {
  info: antDesignInfo,
  graph
}

const store = createAppStore(services)

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root') as HTMLElement)
registerServiceWorker()
