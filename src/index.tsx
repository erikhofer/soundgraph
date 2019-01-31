import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.scss'
import registerServiceWorker from './registerServiceWorker'
import { antDesignInfo } from './services'
import { Services } from './services'
import { createAppStore } from './store'

const services: Services = {
  info: antDesignInfo
}

const store = createAppStore(services)

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root') as HTMLElement)
registerServiceWorker()
