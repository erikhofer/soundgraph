export type PlaybackStatus = 'running' | 'stopped' | 'paused'

export interface PlaybackState {
  status: PlaybackStatus
  duration: number
  pausedAt: number
  startTime: number
}
