
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { benchmarkService } from "@/services/benchmarkService";
import { format } from "date-fns";
import { ChartBar, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { BenchmarkResult } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function BenchmarksPage() {
  const [benchmarks, setBenchmarks] = useState<BenchmarkResult[]>([]);
  
  useEffect(() => {
    const latestBenchmarks = benchmarkService.getLatestBenchmarks(10);
    setBenchmarks(latestBenchmarks);
  }, []);
  
  const handleDownload = (benchmarkId: string, documentId: string) => {
    benchmarkService.downloadReport(benchmarkId, documentId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Benchmarks</h1>
      </div>
      
      {benchmarks.length === 0 ? (
        <div className="text-center py-10">
          <ChartBar className="mx-auto h-10 w-10 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">No benchmarks</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Start a benchmark to view results
          </p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Benchmark Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {benchmarks.map((benchmark) => (
                <div key={benchmark.id} className="space-y-4 pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-lg">
                        {benchmark.documentName || `Document ${benchmark.documentId}`}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(benchmark.date, "PPP")} · Playbook ID: {benchmark.playbookId}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(benchmark.id, benchmark.documentId)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead colSpan={2} className="font-medium text-primary">Benchmark Summary</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Document:</TableCell>
                          <TableCell>{benchmark.documentName || `Document ${benchmark.documentId}`}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Playbook:</TableCell>
                          <TableCell>Playbook {benchmark.playbookId}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Overall % correct:</TableCell>
                          <TableCell>{(benchmark.accuracy * 100).toFixed(1)}%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Issue detection accuracy:</TableCell>
                          <TableCell>{benchmark.issueDetectionCount} of {benchmark.issueDetectionTotal} issues</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Issue location accuracy:</TableCell>
                          <TableCell>{benchmark.issueLocationCount} of {benchmark.issueLocationTotal} issues</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Summary accuracy:</TableCell>
                          <TableCell>{benchmark.summaryCount} of {benchmark.summaryTotal} issues</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Redlining accuracy:</TableCell>
                          <TableCell>{benchmark.redliningCount} of {benchmark.redliningTotal} issues</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">Insights:</span> {benchmark.insights}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
