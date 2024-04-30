export interface IListener {
  on(event: IListener.IEvent): void;
}
export namespace IListener {
  export interface IEvent {
    type: string;
    x: number;
    y: number;
    z: number;
  }
}
