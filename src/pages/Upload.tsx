
import { DocumentUploader } from "@/components/documents/DocumentUploader";

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Upload Document</h1>
      <DocumentUploader />
    </div>
  );
}
