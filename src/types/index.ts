
export interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  status: DocumentStatus;
  playbookId?: string;
  goldenDatasetCreated: boolean;
  benchmarkResults?: BenchmarkResult[];
}

export enum DocumentStatus {
  UPLOADED = "uploaded",
  PENDING_LABELING = "pending_labeling",
  LABELED = "labeled",
  BENCHMARKING = "benchmarking",
  BENCHMARKED = "benchmarked"
}

export interface Playbook {
  id: string;
  name: string;
  description: string;
  issueCount: number;
  lastUpdated: Date;
}

export interface Issue {
  id: string;
  name: string;
  type: "core" | "conditional";
  triggerCondition?: string;
  triggerPrompt?: string;
  position: string;
  prompt: string;
}

export interface BenchmarkResult {
  id: string;
  documentId: string;
  playbookId: string;
  date: Date;
  issuesAnalyzed: number;
  accuracy: number;
  matchRate: number;
  insights: string;
  // Added detailed accuracy metrics
  issueDetectionCount: number;
  issueDetectionTotal: number;
  issueLocationCount: number;
  issueLocationTotal: number;
  summaryCount: number;
  summaryTotal: number;
  redliningCount: number;
  redliningTotal: number;
  documentName?: string; // For displaying in lists
}

export interface BenchmarkReport {
  id: string;
  benchmarkId: string;
  documentId: string;
  playbookId: string;
  generatedDate: Date;
  downloadUrl: string;
  issueResults: IssueResult[];
  overallAccuracy: number;
}

export interface IssueResult {
  issueId: string;
  issueName: string;
  matched: boolean;
  aiDetected: boolean;
  goldenDatasetDetected: boolean;
  context?: string;
  userNotes?: string;
}

export interface Stats {
  totalDocuments: number;
  documentsLabeled: number;
  documentsBenchmarked: number;
  averageAccuracy: number;
  recentBenchmarks: BenchmarkResult[];
}
