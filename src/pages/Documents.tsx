
import { Button } from "@/components/ui/button";
import { DocumentList } from "@/components/documents/DocumentList";
import { documentService } from "@/services/documentService";
import { useState, useEffect } from "react";
import { Document, DocumentStatus } from "@/types";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filter, setFilter] = useState<DocumentStatus | "all">("all");
  const navigate = useNavigate();
  
  const loadDocuments = () => {
    const allDocs = documentService.getAllDocuments();
    
    if (filter === "all") {
      setDocuments(allDocs);
    } else {
      setDocuments(allDocs.filter(doc => doc.status === filter));
    }
  };
  
  useEffect(() => {
    loadDocuments();
  }, [filter]);
  
  const filterOptions = [
    { value: "all", label: "All Documents" },
    { value: DocumentStatus.UPLOADED, label: "Uploaded" },
    { value: DocumentStatus.PENDING_LABELING, label: "Pending Labeling" },
    { value: DocumentStatus.LABELED, label: "Labeled" },
    { value: DocumentStatus.BENCHMARKING, label: "Benchmarking" },
    { value: DocumentStatus.BENCHMARKED, label: "Benchmarked" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <Button onClick={() => navigate("/upload")}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={filter === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(option.value as DocumentStatus | "all")}
          >
            {option.label}
          </Button>
        ))}
      </div>
      
      <DocumentList documents={documents} onRefresh={loadDocuments} />
    </div>
  );
}
