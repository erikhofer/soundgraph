import { Layout } from 'antd'
import * as React from 'react'
import './App.scss'
import Graph from './graph/Graph'

class App extends React.Component {
  public render() {
    const { Footer, Sider, Content } = Layout
    return (
      <div className="App">
        <Layout>
          <Sider>Sider</Sider>
          <Layout>
            <Content>
              <Graph />
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default App
