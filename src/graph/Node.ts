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
  public abstract get numberOfInputs(): number
  public abstract get numberOfOutputs(): number
  public name: string
  public readonly options: OPTIONS
  public position: Point

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

  public getCytoscapeDefinitions = () => {
    console.log(JSON.stringify(this.position))
    const container = {
      data: {
        id: this.id,
        label: this.name,
        root: true,
        position: Object.freeze(JSON.parse(JSON.stringify(this.position)))
      }
    }
    console.log(container)
    const defs: CytoscapeNodeDefinition[] = [
      {
        data: {
          id: this.id,
          label: this.name,
          root: true
        },
        position: {
          x: this.position.x,
          y: this.position.y
        }
      }
    ]
    const inputs = range(0, this.numberOfInputs).map(i => ({
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
    }))

    const outputs = range(0, this.numberOfOutputs).map(i => ({
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
    }))
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

    console.log([container, ...inputs, ...outputs])
    return [container, ...inputs, ...outputs] as CytoscapeNodeDefinition[]
  }
}

function range(start: number, end: number) {
  // if (end - start <= 0) {
  //   return []
  // }
  return new Array(end - start).fill(1).map((d, i) => i + start)
}
