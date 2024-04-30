import { IMemo } from "./IMemo";

export interface IAdvancedCalculator {
  plus(a: number, b: number): number;
  minus(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;

  getId(): string;
  getPrecision(): number;
  getMemo(): IMemo;
}
