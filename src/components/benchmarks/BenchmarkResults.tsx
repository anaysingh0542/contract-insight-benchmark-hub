
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BenchmarkResult } from "@/types";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { benchmarkService } from "@/services/benchmarkService";

interface BenchmarkResultsProps {
  results: BenchmarkResult[];
  documentId: string;
}

export function BenchmarkResults({ results, documentId }: BenchmarkResultsProps) {
  const handleDownload = (resultId: string) => {
    benchmarkService.downloadReport(resultId, documentId);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Benchmark History</CardTitle>
      </CardHeader>
      <CardContent>
        {results.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No benchmark results available</p>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((result) => (
              <div key={result.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{format(result.date, "PPP")}</div>
                    <div className="text-sm text-muted-foreground">
                      {result.issuesAnalyzed} issues analyzed
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(result.id)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Report
                  </Button>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span>{(result.accuracy * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={result.accuracy * 100} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Match Rate</span>
                    <span>{(result.matchRate * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={result.matchRate * 100} className="h-2" />
                </div>
                <div className="text-sm">
                  <strong>Insights:</strong> {result.insights}
                </div>
                <hr />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
