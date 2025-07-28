import { PageHeader } from '@/components/common/page-header';
import { SchemeFinder } from '@/components/schemes/scheme-finder';

export default function SchemesPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <PageHeader
        title="KishanMitro"
        description="Find relevant government agricultural schemes. Describe your needs to get started."
      />
      <div className="mt-8">
        <SchemeFinder />
      </div>
    </div>
  );
}
