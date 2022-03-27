declare module "send-beacon" {
  function sendBeacon(url: string, data?: string): void;
  export = sendBeacon;
}
