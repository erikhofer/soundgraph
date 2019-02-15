import { AppAction, AppStore } from '../store'

export class ScheduleService {
  public store: AppStore
  private handles = new Map<string, any>()

  public scheduleAction(
    key: string,
    action: AppAction,
    millisecondsFromNow: number
  ) {
    const handle = setTimeout(
      () => this.store.dispatch(action),
      millisecondsFromNow
    )
    this.handles.set(key, handle)
  }

  public cancel(key: string) {
    clearTimeout(this.handles.get(key))
  }
}
