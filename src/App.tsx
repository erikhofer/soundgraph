import { Button, Layout } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import './App.scss'
import { Graph } from './graph/Graph'
import { CytoscapeNodeDefinition } from './graph/Node'
import ReactGraph from './graph/react/ReactGraph'
import { SoundgraphNode } from './nodes/SoundgraphNode'
import { SoundgraphNodeFactory } from './nodes/SoundgraphNodeFactory'
import { AppState, DispatchProps, mapDispatchToProps } from './store'
import { playingActions } from './store/actions'

interface AppState2 {
  nodes: CytoscapeNodeDefinition[]
}

interface AppProps extends DispatchProps {
  playing: boolean
}

const mapStateToProps = (state: AppState) => ({ playing: state.playing })

class App extends React.Component<AppProps> {
  public state: AppState2 = { nodes: [] }
  private audioContext = new AudioContext()
  private graph = new Graph<SoundgraphNode>(
    new SoundgraphNodeFactory(this.audioContext)
  )
  public handlePlaying = () => {
    this.props.dispatch(playingActions.playingContent.request())
  }
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
            <Footer>
              Footer
              <Button type="primary" onClick={this.handlePlaying}>
                {this.props.playing === false
                  ? 'Start Playing'
                  : 'Stop Playing'}
              </Button>
            </Footer>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
