export class Site {
    public id: number;
    public name: string;
    public ipAddress: string;
    public port: number;

    constructor(id: number, name: string, ipAddress: string,port: number) {
    this.id = id;
    this.name = name;
    this.ipAddress = ipAddress;
    this.port = port;
  }
}