import { notFound } from 'next/navigation';

import { LandingPage } from '../../features/landing/LandingPage';
import { findLandingPage } from '../../features/landing/findLandingPage';
import { generateLandingMetadata } from '../../features/landing/generateLandingMetadata';
import { generateLandingStaticParams } from '../../features/landing/generateLandingStaticParams';

export const generateMetadata = generateLandingMetadata;
export const generateStaticParams = generateLandingStaticParams;

/*** Render only explicitly supported service routes. */
export default async function Page({ params }: { readonly params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findLandingPage(slug);

  if (!page) {
    notFound();
  }

  return <LandingPage page={page} />;
}
