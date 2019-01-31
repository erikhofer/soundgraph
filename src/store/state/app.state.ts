import { DeepReadonly } from 'ts-essentials'


export type AppState = DeepReadonly<{
  playing: boolean
}>