declare module "send-beacon" {
  function sendBeacon(url: string, data: any): void;
  export = sendBeacon;
}
