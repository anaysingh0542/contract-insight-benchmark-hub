
import { BenchmarkActions } from "@/components/benchmarks/BenchmarkActions";
import { BenchmarkResults } from "@/components/benchmarks/BenchmarkResults";
import { PlaybookSelector } from "@/components/documents/PlaybookSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { documentService } from "@/services/documentService";
import { Document } from "@/types";
import { format } from "date-fns";
import { ChartBar, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DocumentDetailsPage() {
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const loadDocument = () => {
    if (!id) {
      navigate("/documents");
      return;
    }
    
    const doc = documentService.getDocumentById(id);
    if (doc) {
      setDocument(doc);
    } else {
      navigate("/documents");
    }
    setLoading(false);
  };
  
  useEffect(() => {
    loadDocument();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!document) {
    return null;
  }
  
  const playbooks = documentService.getAllPlaybooks();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{document.name}</h1>
          <p className="text-muted-foreground">
            Uploaded on {format(document.uploadDate, "PPP")}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/documents")}>
          Back to Documents
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl">Document Details</CardTitle>
            <FileText className="h-5 w-5" />
          </CardHeader>
          <CardContent className="pt-4">
            <dl className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                <dd className="mt-1 text-sm font-medium">{document.status}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Golden Dataset</dt>
                <dd className="mt-1 text-sm font-medium">
                  {document.goldenDatasetCreated ? "Created" : "Not Created"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Assigned Playbook</dt>
                <dd className="mt-1 text-sm font-medium">
                  {document.playbookId ? 
                    playbooks.find(p => p.id === document.playbookId)?.name || document.playbookId 
                    : "None"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Benchmark Results</dt>
                <dd className="mt-1 text-sm font-medium">
                  {document.benchmarkResults && document.benchmarkResults.length > 0
                    ? `${document.benchmarkResults.length} benchmark(s)`
                    : "No benchmarks"}
                </dd>
              </div>
            </dl>
            
            {!document.goldenDatasetCreated && (
              <div className="mt-6 flex flex-col space-y-2">
                <p className="text-sm">
                  This document doesn't have a golden dataset. Create one in the Word Add-in.
                </p>
                <Button variant="outline">
                  Open in Word Add-in
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {!document.playbookId ? (
          <PlaybookSelector 
            document={document} 
            playbooks={playbooks}
            onPlaybookAssigned={loadDocument}
          />
        ) : (
          <BenchmarkActions 
            document={document}
            onBenchmarkStarted={loadDocument}
          />
        )}
      </div>
      
      {document.benchmarkResults && document.benchmarkResults.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center space-x-2 mb-4">
            <ChartBar className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Benchmark Results</h2>
          </div>
          <BenchmarkResults 
            results={document.benchmarkResults} 
            documentId={document.id}
          />
        </div>
      )}
    </div>
  );
}
