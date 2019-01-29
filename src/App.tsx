import { Button, Layout } from 'antd'
import * as React from 'react'
import { v4 } from 'uuid'
import './App.scss'
import GraphRenderer from './graph/react/GraphRenderer'
import { AudioNodeControl } from './nodes/AudioNodeControl'
import { Gain } from './nodes/effects/Gain'

interface AppState {
  nodes: Array<AudioNodeControl<any>>
}

class App extends React.Component<{}, AppState> {
  public state: AppState = { nodes: [] }
  private audioContext = new AudioContext()
  public render() {
    const { Footer, Sider, Content } = Layout
    return (
      <div className="App">
        <Layout>
          <Sider>
            <Button onClick={this.createNode}>Add Node</Button>
          </Sider>
          <Layout>
            <Content>
              <GraphRenderer nodes={this.state.nodes} />
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }

  private createNode = () => {
    this.setState({
      nodes: [...this.state.nodes, new Gain(v4(), this.audioContext)]
    })
  }
}

export default App
