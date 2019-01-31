import { NodeDefinition } from 'cytoscape'

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

export interface Point {
  x: number
  y: number
}

export abstract class Node<TYPE extends string, OPTIONS> {
  public name: string
  public position: Point

  public constructor(public readonly type: TYPE, public readonly id: string) {
    this.name = this.constructor.name
    this.position = {
      x: 0,
      y: 0
    }
  }

  public abstract get numberOfInputs(): number
  public abstract get numberOfOutputs(): number

  public get cytoscapeDefinitions() {
    const defs: CytoscapeNodeDefinition[] = []

    defs.push({
      data: {
        id: this.id,
        label: this.name
      },
      position: this.position
    })

    for (let i = 0; i < this.numberOfInputs; i++) {
      defs.push({
        data: {
          id: this.id + '-input-' + i,
          parent: this.id,
          label: 'Input ' + i
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
          label: 'Output ' + i
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
