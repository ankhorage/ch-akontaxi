import { ImprintPage } from '../../features/legal/ImprintPage';
import { createImprintMetadata } from '../../features/seo/createImprintMetadata';

export const metadata = createImprintMetadata();

/*** Render the canonical AKON TAXI legal notice route. */
export default function Page() {
  return <ImprintPage />;
}
