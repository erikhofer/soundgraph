import { NodeDefinition } from 'cytoscape'
import { Point } from './Util'

export type CytoscapeNodeDefinition = NodeDefinition & {
  scratch?: {
    _options?: any
  }
}

export type NodeType<NODE extends Node<any, any>> = NODE extends Node<
  infer TYPE,
  any
>
  ? TYPE
  : never

export abstract class Node<TYPE extends string, OPTIONS> {
  public name: string
  public position: Point
  public readonly options: OPTIONS

  public constructor(public readonly type: TYPE, public readonly id: string) {
    this.name = this.constructor.name
    this.position = {
      x: 0,
      y: 0
    }
    this.setOptions({})
  }

  public setOptions(options: Partial<OPTIONS>) {
    const mergedOptions = {
      ...this.options,
      ...options
    }
    // @ts-ignore
    this.options = mergedOptions
  }

  public abstract get numberOfInputs(): number
  public abstract get numberOfOutputs(): number

  public getCytoscapeDefinitions() {
    const defs: CytoscapeNodeDefinition[] = []

    defs.push({
      data: {
        id: this.id,
        label: this.name,
        root: true
      },
      position: this.position
    })

    for (let i = 0; i < this.numberOfInputs; i++) {
      defs.push({
        data: {
          id: this.id + '-input-' + i,
          parent: this.id,
          label: 'Input ' + i,
          input: true
        },
        position: {
          x: 0,
          y: i * 40
        },
        grabbable: false,
        selectable: false
      })
    }
    for (let i = 0; i < this.numberOfOutputs; i++) {
      defs.push({
        data: {
          id: this.id + '-output-' + i,
          parent: this.id,
          label: 'Output ' + i,
          output: true
        },
        position: {
          x: 100,
          y: i * 40
        },
        grabbable: false,
        selectable: false
      })
    }

    return defs
  }
}
