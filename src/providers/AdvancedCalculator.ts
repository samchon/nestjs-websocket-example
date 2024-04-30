import { Driver } from "tgrid";

import { IAdvancedCalculator } from "../api/structures/IAdvancedCalculator";
import { IHeader } from "../api/structures/IHeader";
import { IListener } from "../api/structures/IListener";
import { IMemo } from "../api/structures/IMemo";

export class AdvancedCalculator implements IAdvancedCalculator {
  private round: (value: number) => number;

  public constructor(
    private readonly id: string,
    private readonly header: IHeader,
    private readonly memo: IMemo,
    private readonly listener: Driver<IListener>,
  ) {
    this.round = roundPrecision(header.precision);
  }

  public getId(): string {
    return this.id;
  }
  public getPrecision(): number {
    return this.header.precision;
  }
  public getMemo(): IMemo {
    return this.memo;
  }

  public plus(x: number, y: number): number {
    const z: number = this.round(x + y);
    this.listener.on({ type: "plus", x, y, z }).catch(() => {});
    return z;
  }
  public minus(x: number, y: number): number {
    const z: number = this.round(x - y);
    this.listener.on({ type: "minus", x, y, z }).catch(() => {});
    return z;
  }
  public multiply(x: number, y: number): number {
    const z: number = this.round(x * y);
    this.listener.on({ type: "multiply", x, y, z }).catch(() => {});
    return z;
  }
  public divide(x: number, y: number): number {
    const z: number = this.round(x / y);
    this.listener.on({ type: "divide", x, y, z }).catch(() => {});
    return z;
  }
}

const roundPrecision =
  (precision: number) =>
  (value: number): number => {
    const factor: number = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  };
