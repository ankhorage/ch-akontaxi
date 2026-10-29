export {};

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: 'conversion',
      parameters: {
        readonly send_to: string;
        readonly value: number;
        readonly currency: string;
        readonly event_timeout?: number;
        readonly event_callback?: () => void;
      },
    ) => void;
  }
}
