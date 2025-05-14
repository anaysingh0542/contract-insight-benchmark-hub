
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { benchmarkService } from "@/services/benchmarkService";
import { format } from "date-fns";
import { ChartBar, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { BenchmarkResult } from "@/types";

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
            <div className="space-y-6">
              {benchmarks.map((benchmark) => (
                <div key={benchmark.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{(benchmark as any).documentName || `Document ${benchmark.documentId}`}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(benchmark.date, "PPP")} · {benchmark.issuesAnalyzed} issues analyzed
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Accuracy:</span>
                        <span>{(benchmark.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${benchmark.accuracy * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Match Rate:</span>
                        <span>{(benchmark.matchRate * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${benchmark.matchRate * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Insights:</span> {benchmark.insights}
                  </div>
                  <hr className="my-4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
