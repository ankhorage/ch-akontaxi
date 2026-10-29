'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { BUSINESS } from '../../constants/business';
import { reportGoogleAdsPhoneConversion } from './reportGoogleAdsPhoneConversion';

type PhoneLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'>;

/*** Render the verified call link and report each unblocked phone interaction once to Google Ads. */
export function PhoneLink({ onClick, ...props }: PhoneLinkProps) {
  const handleClick: PhoneLinkProps['onClick'] = (event) => {
    onClick?.(event);

    if (!event.defaultPrevented) {
      const isTracking = reportGoogleAdsPhoneConversion(window.gtag, () => {
        window.location.assign(BUSINESS.phoneHref);
      });

      if (isTracking) {
        event.preventDefault();
      }
    }
  };

  return <a {...props} href={BUSINESS.phoneHref} onClick={handleClick} />;
}
