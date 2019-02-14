import { Button, Progress } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { AppState, DispatchProps, mapDispatchToProps } from '../store'
import { playbackActions } from '../store/actions'
import { PlaybackState } from '../store/state/playback.state'
import { PROTECTED_SPACE } from '../util'

interface PlaybackControlProps extends DispatchProps, PlaybackState {}

interface PlaybackControlState {
  elapsedTime: number
}

const mapStateToProps = (state: AppState) => ({ ...state.playback })

class PlaybackControl extends React.Component<
  PlaybackControlProps,
  PlaybackControlState
> {
  public state: PlaybackControlState = {
    elapsedTime: 0
  }

  public render() {
    const { status, duration } = this.props
    const { elapsedTime } = this.state
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <Progress
            percent={duration > 0 ? (elapsedTime / duration) * 100 : 0}
          />
        </div>
        <div>
          {PROTECTED_SPACE}
          <Button
            type="primary"
            shape="circle"
            size="large"
            onClick={this.handlePlayPause}
          >
            <span
              className={'fa fa-' + (status === 'running' ? 'pause' : 'play')}
              style={{ fontSize: 20 }}
            />
          </Button>
          {PROTECTED_SPACE}
          <Button shape="circle" onClick={this.handleStop}>
            <span className="fa fa-stop" style={{ fontSize: 15 }} />
          </Button>
        </div>
      </div>
    )
  }

  public componentDidUpdate(
    prevProps: PlaybackControlProps,
    prevState: PlaybackControlState
  ) {
    const { status } = this.props
    if (status !== prevProps.status) {
      if (status === 'stopped') {
        this.setState({ elapsedTime: 0 })
      }
      if (status === 'running') {
        setTimeout(this.incrementElapsedTime, 1000)
      }
    }
  }

  private incrementElapsedTime = () => {
    if (this.props.status === 'running') {
      this.setState({ elapsedTime: this.state.elapsedTime + 1 })
      setTimeout(this.incrementElapsedTime, 1000)
    }
  }

  private handlePlayPause = () => {
    this.props.dispatch(
      playbackActions.setPlaybackStatus.request(
        this.props.status === 'running' ? 'paused' : 'running'
      )
    )
  }

  private handleStop = () => {
    this.props.dispatch(playbackActions.setPlaybackStatus.request('stopped'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaybackControl)
