export interface LandingPageDetails {
  readonly slug: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly intro: string;
  readonly items: readonly (readonly [string, string])[];
  readonly note: string;
}
