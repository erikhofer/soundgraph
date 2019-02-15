import { Button, Progress, TimePicker } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { AppState, DispatchProps, mapDispatchToProps } from '../store'
import { playbackActions } from '../store/actions'
import { PlaybackState } from '../store/state/playback.state'
import { PROTECTED_SPACE } from '../util'

/** update elapsedTime every x ms */
const UPDATE_RATE = 100

interface PlaybackControlProps extends DispatchProps, PlaybackState {}

interface PlaybackControlState {
  elapsedTime: number
  selectedDuration: number
}

const mapStateToProps = (state: AppState) => ({ ...state.playback })

class PlaybackControl extends React.Component<
  PlaybackControlProps,
  PlaybackControlState
> {
  public state: PlaybackControlState = {
    elapsedTime: 0,
    selectedDuration: this.props.duration
  }

  public render() {
    const { status, duration } = this.props
    const { elapsedTime, selectedDuration } = this.state
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, paddingRight: 50, paddingTop: 8 }}>
          <Progress
            percent={duration > 0 ? (elapsedTime / duration) * 100 : 0}
            showInfo={false}
          />
        </div>
        <div>
          {this.renderElapsedTime()} /{PROTECTED_SPACE}
          <TimePicker
            value={moment('00:00:00', 'HH:mm:ss').milliseconds(
              selectedDuration
            )}
            onChange={this.setSelectedDuration}
            onOpenChange={this.handleDurationSelection}
          />
          <span style={{ display: 'inline-block', width: 50 }} />
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
    const { status, pausedAt } = this.props
    if (status !== prevProps.status) {
      if (status === 'stopped') {
        this.setState({ elapsedTime: 0 })
      }
      if (status === 'running') {
        setTimeout(this.updateElapsedTime, UPDATE_RATE)
      }
    }
    if (status === 'paused' && this.state.elapsedTime !== pausedAt) {
      this.setState({ elapsedTime: pausedAt })
    }
  }

  private setSelectedDuration = (duration: moment.Moment) => {
    const selectedDuration = duration
      ? duration.seconds() * 1000 +
        duration.minutes() * 60 * 1000 +
        duration.hours() * 60 * 60 * 1000
      : 0
    this.setState({ selectedDuration })
  }

  private handleDurationSelection = (pickerOpen: boolean) => {
    if (!pickerOpen && this.state.selectedDuration !== this.props.duration) {
      this.props.dispatch(
        playbackActions.setPlaybackDuration.request(this.state.selectedDuration)
      )
    }
  }

  private updateElapsedTime = () => {
    const { status, startTime, pausedAt } = this.props
    if (status === 'running') {
      this.setState({
        // just increasing by UPDATE_RATE is too unprecise
        elapsedTime: new Date().getTime() - startTime + pausedAt
      })
      setTimeout(this.updateElapsedTime, UPDATE_RATE)
    }
  }

  private handlePlayPause = () => {
    this.props.dispatch(
      playbackActions.setPlaybackStatus.request(
        this.props.status === 'running' ? 'paused' : 'running'
      )
    )
  }

  private renderElapsedTime() {
    return moment('00:00:00', 'HH:mm:ss')
      .milliseconds(this.state.elapsedTime)
      .format('HH:mm:ss')
  }

  private handleStop = () => {
    this.props.dispatch(playbackActions.setPlaybackStatus.request('stopped'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaybackControl)
