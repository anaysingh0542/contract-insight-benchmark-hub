
import { BenchmarkReport, BenchmarkResult, Document } from "../types";
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
        documentService.updateDocumentStatus(documentId, "benchmarking");
        toast.success("Benchmarking process started");
        resolve(true);
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
