import { Button, Layout } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import './App.scss'
import GraphContainer from './components/GraphContainer'
import NodeLibrary from './components/NodeLibrary'
import { AppState, DispatchProps, mapDispatchToProps } from './store'
import { playingActions } from './store/actions'

interface AppProps extends DispatchProps {
  playing: boolean
}

const mapStateToProps = (state: AppState) => ({ playing: state.playing })

class App extends React.Component<AppProps> {
  public handlePlaying = () => {
    this.props.dispatch(playingActions.playingContent.request())
  }
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
