import { v4 as generateId } from 'uuid'

export abstract class Node<T> {
  public readonly id: string
  protected options: T

  public constructor(options: T) {
    this.options = options
    this.id = generateId()
  }

  public get numberOfInputs() {
    return 3
  }

  public get numberOfOutputs() {
    return 5
  }
}
