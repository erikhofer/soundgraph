import { createStandardAction } from 'typesafe-actions'

export const setFileName = createStandardAction('SET_FILE_NAME')<string>()
