import { Driver } from "tgrid";

import { ICalculator } from "../api/structures/ICalculator";
import { IListener } from "../api/structures/IListener";

export class Calculator implements ICalculator {
  public constructor(private readonly listener: Driver<IListener>) {}

  public plus(x: number, y: number): number {
    const z: number = x + y;
    this.listener.on({ type: "plus", x, y, z }).catch(() => {});
    return z;
  }

  public minus(x: number, y: number): number {
    const z: number = x - y;
    this.listener.on({ type: "minus", x, y, z }).catch(() => {});
    return z;
  }

  public multiply(x: number, y: number): number {
    const z: number = x * y;
    this.listener.on({ type: "multiply", x, y, z }).catch(() => {});
    return z;
  }

  public divide(x: number, y: number): number {
    const z: number = x / y;
    this.listener.on({ type: "divide", x, y, z }).catch(() => {});
    return z;
  }
}
