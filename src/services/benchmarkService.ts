
import { BenchmarkReport, BenchmarkResult, Document, DocumentStatus } from "../types";
import { documentService } from "./documentService";
import { toast } from "sonner";

export const benchmarkService = {
  startBenchmark: (documentId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const document = documentService.getDocumentById(documentId);
      
      if (!document || !document.goldenDatasetCreated || !document.playbookId) {
        toast.error("Cannot benchmark: Document must have a golden dataset and assigned playbook");
        resolve(false);
        return;
      }
      
      // In real app, this would trigger a backend process
      setTimeout(() => {
        documentService.updateDocumentStatus(documentId, DocumentStatus.BENCHMARKING);
        toast.success("Benchmarking process started");
        resolve(true);
        
        // Simulate benchmarking completion after some time
        setTimeout(() => {
          const doc = documentService.getDocumentById(documentId);
          if (doc) {
            // Generate mock detailed benchmark result
            const totalIssues = Math.floor(Math.random() * 30) + 20; // 20-50 issues
            const issueDetectionCount = Math.floor(Math.random() * totalIssues);
            const issueLocationCount = Math.floor(Math.random() * issueDetectionCount);
            const summaryCount = Math.floor(Math.random() * issueDetectionCount);
            const redliningCount = Math.floor(Math.random() * issueDetectionCount);
            
            const benchmarkResult: BenchmarkResult = {
              id: `benchmark-${Date.now()}`,
              documentId,
              playbookId: doc.playbookId || "",
              date: new Date(),
              issuesAnalyzed: totalIssues,
              accuracy: issueDetectionCount / totalIssues,
              matchRate: issueLocationCount / totalIssues,
              insights: "AI model shows strengths in issue detection but needs improvement in redlining accuracy.",
              // Detailed metrics
              issueDetectionCount,
              issueDetectionTotal: totalIssues,
              issueLocationCount,
              issueLocationTotal: totalIssues,
              summaryCount,
              summaryTotal: totalIssues,
              redliningCount,
              redliningTotal: totalIssues
            };
            
            // Update document with results and change status
            const updatedDoc = {
              ...doc,
              status: DocumentStatus.BENCHMARKED,
              benchmarkResults: [
                ...(doc.benchmarkResults || []),
                benchmarkResult
              ]
            };
            
            documentService.updateDocument(updatedDoc);
            toast.success("Benchmarking completed");
          }
        }, 10000); // Complete after 10 seconds
      }, 1000);
    });
  },
  
  getBenchmarkResults: (documentId: string): BenchmarkResult[] => {
    const document = documentService.getDocumentById(documentId);
    return document?.benchmarkResults || [];
  },
  
  downloadReport: (benchmarkId: string, documentId: string): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate API call that would generate and return report URL
      setTimeout(() => {
        const reportUrl = `/api/reports/${benchmarkId}`;
        toast.success("Report generated successfully");
        // In a real app, this would likely trigger a download
        resolve(reportUrl);
      }, 2000);
    });
  },
  
  getLatestBenchmarks: (limit: number = 5): BenchmarkResult[] => {
    const allDocuments = documentService.getAllDocuments();
    
    return allDocuments
      .flatMap(doc => (doc.benchmarkResults || []).map(result => ({
        ...result,
        documentName: doc.name
      })))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  }
};
