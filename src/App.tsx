import { Button, Layout } from 'antd'
import * as React from 'react'
import './App.scss'
import { Graph } from './graph/Graph'
import { CytoscapeNodeDefinition } from './graph/Node'
import ReactGraph from './graph/react/ReactGraph'
import { SoundgraphNode } from './nodes/SoundgraphNode'
import { SoundgraphNodeFactory } from './nodes/SoundgraphNodeFactory'

interface AppState {
  nodes: CytoscapeNodeDefinition[]
}

class App extends React.Component<{}, AppState> {
  public state: AppState = { nodes: [] }
  private audioContext = new AudioContext()
  private graph = new Graph<SoundgraphNode>(
    new SoundgraphNodeFactory(this.audioContext)
  )
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
              <ReactGraph nodes={this.state.nodes} />
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }

  private createNode = () => {
    const node = this.graph.addNode('Gain')
    this.setState({
      nodes: [...this.state.nodes, ...node.cytoscapeDefinitions]
    })
  }
}

export default App
