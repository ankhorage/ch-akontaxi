'use client';

import { type ComponentPropsWithoutRef, useContext } from 'react';

import { BUSINESS } from '../../constants/business';
import { MeasurementConsentContext } from '../consent/MeasurementConsentContext';
import { handlePhoneLinkClick } from './handlePhoneLinkClick';

type PhoneLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'>;

/*** Render the verified call link and preserve native telephone navigation on every supported device. */
export function PhoneLink({ onClick, ...props }: PhoneLinkProps) {
  const hasMeasurementConsent = useContext(MeasurementConsentContext);
  const handleClick: PhoneLinkProps['onClick'] = (event) => {
    onClick?.(event);

    handlePhoneLinkClick({
      defaultPrevented: event.defaultPrevented,
      googleTag: window.gtag,
      hasMeasurementConsent,
    });
  };

  return <a {...props} href={BUSINESS.phoneHref} onClick={handleClick} />;
}
