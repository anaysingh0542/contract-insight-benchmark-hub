
import { Document, DocumentStatus, Playbook, BenchmarkResult, Stats } from "../types";

// Mock Playbooks
export const mockPlaybooks: Playbook[] = [
  {
    id: "p1",
    name: "NDA Playbook",
    description: "Standard playbook for Non-Disclosure Agreements",
    issueCount: 12,
    lastUpdated: new Date("2023-12-10")
  },
  {
    id: "p2",
    name: "Service Agreement Playbook",
    description: "For service and consulting agreements",
    issueCount: 18,
    lastUpdated: new Date("2024-02-15")
  },
  {
    id: "p3",
    name: "Vendor Contract Playbook",
    description: "For vendor and supplier agreements",
    issueCount: 15,
    lastUpdated: new Date("2024-04-01")
  },
  {
    id: "p4",
    name: "Employment Contract Playbook",
    description: "Standard employment contract templates and issues",
    issueCount: 20,
    lastUpdated: new Date("2024-03-22")
  }
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: "d1",
    name: "Acme Corp NDA.docx",
    uploadDate: new Date("2024-03-15"),
    status: DocumentStatus.BENCHMARKED,
    playbookId: "p1",
    goldenDatasetCreated: true,
    benchmarkResults: [
      {
        id: "br1",
        documentId: "d1",
        playbookId: "p1",
        date: new Date("2024-03-18"),
        issuesAnalyzed: 12,
        accuracy: 0.85,
        matchRate: 0.82,
        insights: "Good performance on confidentiality clauses but missed some term definitions."
      }
    ]
  },
  {
    id: "d2",
    name: "TechCo Services Agreement.docx",
    uploadDate: new Date("2024-04-01"),
    status: DocumentStatus.LABELED,
    playbookId: "p2",
    goldenDatasetCreated: true,
    benchmarkResults: []
  },
  {
    id: "d3",
    name: "Supplier Agreement - Widget Inc.docx",
    uploadDate: new Date("2024-04-10"),
    status: DocumentStatus.PENDING_LABELING,
    playbookId: "p3",
    goldenDatasetCreated: false,
    benchmarkResults: []
  },
  {
    id: "d4",
    name: "Senior Developer Employment Contract.docx",
    uploadDate: new Date("2024-03-25"),
    status: DocumentStatus.LABELED,
    playbookId: "p4",
    goldenDatasetCreated: true,
    benchmarkResults: []
  },
  {
    id: "d5",
    name: "GlobalTech NDA 2023.docx",
    uploadDate: new Date("2024-01-15"),
    status: DocumentStatus.BENCHMARKED,
    playbookId: "p1",
    goldenDatasetCreated: true,
    benchmarkResults: [
      {
        id: "br2",
        documentId: "d5",
        playbookId: "p1",
        date: new Date("2024-01-18"),
        issuesAnalyzed: 12,
        accuracy: 0.78,
        matchRate: 0.75,
        insights: "Initial benchmark showed gaps in handling jurisdiction clauses."
      },
      {
        id: "br3",
        documentId: "d5",
        playbookId: "p1",
        date: new Date("2024-04-05"),
        issuesAnalyzed: 12,
        accuracy: 0.91,
        matchRate: 0.89,
        insights: "Significant improvement after model retraining, especially on jurisdiction clauses."
      }
    ]
  }
];

// Mock Stats
export const mockStats: Stats = {
  totalDocuments: mockDocuments.length,
  documentsLabeled: mockDocuments.filter(d => d.goldenDatasetCreated).length,
  documentsBenchmarked: mockDocuments.filter(d => d.status === DocumentStatus.BENCHMARKED).length,
  averageAccuracy: 0.85,
  recentBenchmarks: mockDocuments
    .flatMap(d => d.benchmarkResults || [])
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3)
};
