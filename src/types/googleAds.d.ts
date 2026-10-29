export {};

type GoogleTag = (...args: GoogleTagCommand) => void;

type GoogleTagCommand =
  | [
      command: 'consent',
      action: 'default' | 'update',
      parameters: {
        readonly ad_storage: 'denied' | 'granted';
        readonly ad_user_data: 'denied' | 'granted';
        readonly ad_personalization: 'denied' | 'granted';
        readonly analytics_storage: 'denied' | 'granted';
      },
    ]
  | [command: 'js', date: Date]
  | [command: 'config', targetId: 'AW-18499497170']
  | [
      command: 'event',
      eventName: 'conversion',
      parameters: {
        readonly send_to: string;
        readonly value: number;
        readonly currency: string;
        readonly event_timeout?: number;
        readonly event_callback?: () => void;
      },
    ];

declare global {
  interface Window {
    gtag?: GoogleTag;
  }
}
