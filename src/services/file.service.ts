import FileSaver from 'file-saver'
import { Edge } from '../graph/Edge'
import { Point } from '../graph/Util'

/* Increase this whenever the format of the file is changed in a non-compatible way. */
export const CURRENT_FORMAT_VERSION = 1

export interface NodeDefinition {
  id: string
  type: string
  name: string
  position: Point
  options: any
}

export interface SoundgraphFile {
  version: number
  duration: number
  nodes: NodeDefinition[]
  edges: Edge[]
}

export class FileService {
  public saveFile(file: SoundgraphFile, fileName: string): boolean {
    const blob = new Blob([JSON.stringify(file)], {
      type: 'application/json;charset=utf-8'
    })
    FileSaver.saveAs(blob, fileName)
    // There is no way to know if the user canceled this or not
    return true
  }

  public loadFile(content: string): SoundgraphFile {
    let file
    try {
      file = JSON.parse(content) as SoundgraphFile
    } catch (e) {
      throw new Error('Invalid file')
    }
    if (file.version !== CURRENT_FORMAT_VERSION) {
      throw new Error('The file format is outdated :(')
    }
    return file
  }
}
