import { Layout } from 'antd'
import * as React from 'react'
import './App.scss'
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
            <NodeLibrary />
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
