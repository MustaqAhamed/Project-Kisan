import { PageHeader } from '@/components/common/page-header';
import { CropAnalyzerView } from '@/components/crop-analyzer/crop-analyzer-view';

export default function AnalyzerPage() {
  return (
    <div className="container mx-auto max-w-6xl">
       <PageHeader
        title="Visual Crop Analyzer"
        description="Upload an image of your crop to get an AI-powered health analysis and identify potential issues."
      />
      <div className="mt-8">
        <CropAnalyzerView />
      </div>
    </div>
  );
}
