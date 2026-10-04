interface BrandLogoProps {
  readonly compact?: boolean;
}

/*** Render the AKON TAXI wordmark with the selected road-shaped A signet. */
export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <span className="brand-logo" aria-label="AKON TAXI">
      <svg className="brand-logo__mark" viewBox="0 0 120 100" role="img" aria-hidden="true">
        <path
          className="brand-logo__letter"
          fillRule="evenodd"
          d="M58 6 118 95H86L73 75H42L29 95H0L58 6Zm0 39-9 15h18L58 45Z"
        />
        <path
          className="brand-logo__road"
          d="M12 88C34 61 64 47 111 29"
          fill="none"
          strokeLinecap="round"
          strokeWidth="8"
        />
      </svg>
      {!compact && (
        <span className="brand-logo__words" aria-hidden="true">
          <span>AKON</span>
          <strong>TAXI</strong>
        </span>
      )}
    </span>
  );
}
