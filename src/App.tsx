import { Layout } from 'antd'
import * as React from 'react'
import './App.scss'
import FileControl from './components/FileControl'
import GraphContainer from './components/GraphContainer'
import NodeLibrary from './components/NodeLibrary'
import PlaybackControl from './components/PlaybackControl'

export default class App extends React.Component {
  public render() {
    const { Footer, Sider, Content } = Layout
    return (
      <div className="App">
        <Layout>
          <Sider>
            <div className="App-sidebar">
              <h1>SoundGraph</h1>
              <FileControl />
              <NodeLibrary />
            </div>
          </Sider>
          <Layout>
            <Content>
              <GraphContainer />
            </Content>
            <Footer style={{ backgroundColor: 'lightgrey' }}>
              <PlaybackControl />
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}
