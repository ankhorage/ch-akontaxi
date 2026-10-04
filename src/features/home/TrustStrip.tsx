const ITEMS = ['Wetzikon', 'Zürcher Oberland', 'Direkt erreichbar'] as const;

/*** Render the compact local-positioning strip below the hero. */
export function TrustStrip() {
  return (
    <div className="trust-strip" aria-label="AKON TAXI auf einen Blick">
      {ITEMS.map((item) => (
        <span key={item}>
          <i aria-hidden="true" />
          {item}
        </span>
      ))}
    </div>
  );
}
