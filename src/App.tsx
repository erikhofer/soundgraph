import { Button, Layout } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import './App.scss'
import GraphContainer from './components/GraphContainer'
import NodeLibrary from './components/NodeLibrary'
import { AppState, DispatchProps, mapDispatchToProps } from './store'
import { playbackActions } from './store/actions'
import { PlaybackState } from './store/state/playback.state'

interface AppProps extends DispatchProps {
  playback: PlaybackState
}

const mapStateToProps = (state: AppState) => ({ playback: state.playback })

class App extends React.Component<AppProps> {
  public handlePlayingClick = () => {
    switch (this.props.playback.status) {
      case 'running':
        this.props.dispatch(
          playbackActions.setPlaybackStatus.success('stopped')
        )
        break
      case 'stopped':
        this.props.dispatch(
          playbackActions.setPlaybackStatus.success('running')
        )
        break
      case 'paused':
        this.props.dispatch(
          playbackActions.setPlaybackStatus.success('running')
        )
      default:
        break
    }
  }

  public returnStatusPlayString = () => {
    switch (this.props.playback.status) {
      case 'running':
        return 'Stop'

      case 'stopped':
        return 'Start'

      default:
        return ''
    }
  }
  public handlePausedClick = () => {
    switch (this.props.playback.status) {
      case 'running':
        this.props.dispatch(playbackActions.setPlaybackStatus.success('paused'))
        break
      case 'paused':
        this.props.dispatch(
          playbackActions.setPlaybackStatus.success('running')
        )
      default:
        break
    }
  }

  public returnStatusPauseString = () => {
    switch (this.props.playback.status) {
      case 'running':
        return 'Pause'
      case 'stopped':
        return 'Press Start'
      case 'paused':
        return 'Start'
      default:
        return ''
    }
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
              <Button type="primary" onClick={this.handlePlayingClick}>
                {this.returnStatusPlayString()}
              </Button>
              <Button type="primary" onClick={this.handlePausedClick}>
                {this.returnStatusPauseString()}
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
