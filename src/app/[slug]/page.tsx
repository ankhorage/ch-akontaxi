import { notFound } from 'next/navigation';

import { LandingPage } from '../../features/landing/LandingPage';
import { findLandingPage } from '../../features/landing/findLandingPage';

export { generateLandingMetadata as generateMetadata } from '../../features/landing/generateLandingMetadata';
export { generateLandingStaticParams as generateStaticParams } from '../../features/landing/generateLandingStaticParams';

/*** Render only explicitly supported service routes. */
export default async function Page({ params }: { readonly params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findLandingPage(slug);

  if (!page) {
    notFound();
  }

  return <LandingPage page={page} />;
}
