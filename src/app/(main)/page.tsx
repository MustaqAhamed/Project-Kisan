import { ExpertAdviceForm } from '@/components/expert-system/expert-advice-form';
import { PageHeader } from '@/components/common/page-header';

export default function ExpertSystemPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <PageHeader
        title="AI Expert System"
        description="Get AI-powered agricultural advice. Describe your crop, location, and challenges to receive expert guidance."
      />
      <div className="mt-8">
        <ExpertAdviceForm />
      </div>
    </div>
  );
}
