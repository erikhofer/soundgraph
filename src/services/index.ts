import { Observable } from 'rxjs'
import { PayloadAction, PayloadCreator } from 'typesafe-actions/dist/types'
import { antDesignInfo, InfoService } from './info.service'

export type ApiErrorHandler = <T, CREATOR extends PayloadCreator<any, Error>>(
  failureActionCreator: CREATOR
) => (err: any, caught: Observable<T>) => Observable<PayloadAction<any, Error>>

export interface Services {
  info: InfoService
}

export { antDesignInfo }
