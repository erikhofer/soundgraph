import { Graph } from '../graph/Graph'
import { SoundgraphNode } from '../nodes/SoundgraphNode'
import { antDesignInfo, InfoService } from './info.service'
import { ScheduleService } from './schedule.service'

export interface Services {
  info: InfoService
  graph: Graph<SoundgraphNode>
  audioContext: AudioContext
  scheduler: ScheduleService
}

export { antDesignInfo }
