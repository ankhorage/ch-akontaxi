/*** Create the configured Google Ads conversion payload for one intentional phone interaction. */
export function createGoogleAdsPhoneConversionEvent() {
  return {
    send_to: 'AW-18499497170/cWP7CPzmyakdENLZn_VE',
    value: 1,
    currency: 'CHF',
  } as const;
}
