import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { Graph } from './graph/Graph'
import { GraphProvider } from './graph/react/GraphContext'
import './index.scss'
import { SoundgraphNodeFactory } from './nodes/SoundgraphNodeFactory'
import registerServiceWorker from './registerServiceWorker'
import { Services } from './services'
import { antDesignInfo } from './services'
import { FileService } from './services/file.service'
import { ScheduleService } from './services/schedule.service'
import { createAppStore } from './store'

const audioContext = new AudioContext()
const nodeFactory = new SoundgraphNodeFactory(audioContext)
const graph = new Graph(nodeFactory)

const services: Services = {
  info: antDesignInfo,
  graph,
  audioContext,
  scheduler: new ScheduleService(),
  fileService: new FileService()
}

const store = createAppStore(services)

window.onbeforeunload = () => {
  if (store.getState().file.changed) {
    return 'You have unsaved changes! If you leave the page, they will get lost.'
  }
  return
}

const app = (
  <Provider store={store}>
    <GraphProvider value={graph}>
      <App />
    </GraphProvider>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root') as HTMLElement)
registerServiceWorker()
