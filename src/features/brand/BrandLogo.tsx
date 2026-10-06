interface BrandLogoProps {
  readonly compact?: boolean;
}

/*** Render the AKON TAXI wordmark using the canonical light/dark brand mark asset. */
export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <span className="brand-logo" aria-label="AKON TAXI">
      <span className="brand-logo__mark" aria-hidden="true" />
      {!compact && (
        <span className="brand-logo__words" aria-hidden="true">
          <span>AKON</span>
          <strong>TAXI</strong>
        </span>
      )}
    </span>
  );
}
