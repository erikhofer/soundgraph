export abstract class NodeControl<OPTIONS> {
  public constructor(public readonly id: string) {}

  public abstract get numberOfInputs(): number
  public abstract get numberOfOutputs(): number
}
