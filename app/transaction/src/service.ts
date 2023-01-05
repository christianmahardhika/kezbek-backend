// tslint:disable-next-line: interface-name
export interface ClientProxy {
  send(pattern: string, simulation: any): any;
  connect(): any;
  close(): any;
  routingMap(): any;
}
