
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Document, DocumentStatus } from "@/types";
import { format } from "date-fns";
import { 
  ChartBar, 
  ChevronDown, 
  Download, 
  Edit, 
  EyeOff, 
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { benchmarkService } from "@/services/benchmarkService";
import { toast } from "sonner";
import { useCallback } from "react";

interface DocumentListProps {
  documents: Document[];
  onRefresh: () => void;
}

export function DocumentList({ documents, onRefresh }: DocumentListProps) {
  const navigate = useNavigate();

  const getStatusBadge = (status: DocumentStatus) => {
    const statusConfig = {
      uploaded: { label: "Uploaded", variant: "outline" as const },
      pending_labeling: { label: "Pending Labeling", variant: "secondary" as const },
      labeled: { label: "Labeled", variant: "default" as const },
      benchmarking: { label: "Benchmarking", variant: "warning" as const },
      benchmarked: { label: "Benchmarked", variant: "success" as const }
    };

    const config = statusConfig[status] || statusConfig.uploaded;

    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleStartBenchmark = useCallback(async (documentId: string) => {
    try {
      await benchmarkService.startBenchmark(documentId);
      onRefresh();
    } catch (error) {
      toast.error("Failed to start benchmarking");
    }
  }, [onRefresh]);

  const downloadLatestReport = useCallback(async (doc: Document) => {
    if (!doc.benchmarkResults || doc.benchmarkResults.length === 0) {
      toast.error("No benchmark results available");
      return;
    }

    // Sort by date descending and take the latest
    const latestBenchmark = [...doc.benchmarkResults].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    )[0];

    try {
      await benchmarkService.downloadReport(latestBenchmark.id, doc.id);
    } catch (error) {
      toast.error("Failed to download report");
    }
  }, []);

  return (
    <div className="space-y-4">
      {documents.length === 0 ? (
        <div className="text-center py-10">
          <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">No documents</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload a document to get started
          </p>
          <Button onClick={() => navigate("/upload")} className="mt-4">
            Upload Document
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="p-4">
            <div className="font-medium">Documents</div>
            <div className="text-sm text-muted-foreground">
              Manage and benchmark your documents
            </div>
          </div>
          <div className="divide-y">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center p-4">
                <div className="flex-grow space-y-1">
                  <div className="flex items-center">
                    <div className="font-medium">{doc.name}</div>
                    <div className="ml-2">{getStatusBadge(doc.status)}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Uploaded {format(doc.uploadDate, "PPP")}
                    {doc.playbookId && <> · Playbook assigned</>}
                    {doc.goldenDatasetCreated && <> · Golden dataset created</>}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <span className="sr-only">Actions</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem onClick={() => navigate(`/documents/${doc.id}`)}>
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    
                    {doc.goldenDatasetCreated && doc.status !== DocumentStatus.BENCHMARKING && (
                      <DropdownMenuItem onClick={() => handleStartBenchmark(doc.id)}>
                        <ChartBar className="mr-2 h-4 w-4" />
                        Start Benchmark
                      </DropdownMenuItem>
                    )}
                    
                    {doc.status === DocumentStatus.BENCHMARKED && (
                      <DropdownMenuItem onClick={() => downloadLatestReport(doc)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                      </DropdownMenuItem>
                    )}
                    
                    {!doc.goldenDatasetCreated && (
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Label in Word Add-in
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
