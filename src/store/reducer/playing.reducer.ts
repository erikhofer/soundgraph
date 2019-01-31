import { Reducer } from 'react'
import { AppAction } from '..'

export const playingReducer: Reducer<boolean, AppAction> = (state = true) => {
  return state
}
