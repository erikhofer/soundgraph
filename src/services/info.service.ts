import { message } from 'antd'

export interface InfoService {
  successMessage(message: string, duration?: number): void
  warningMessage(message: string, duration?: number): void
  errorMessage(message: string, duration?: number): void
}

export const antDesignInfo: InfoService = {
  errorMessage: (msg, duration) => message.error(msg, duration),
  successMessage: (msg, duration) => message.success(msg, duration),
  warningMessage: (msg, duration) => message.warning(msg, duration)
}
