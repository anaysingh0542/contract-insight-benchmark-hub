
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
              <div key={result.id} className="space-y-4">
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
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-3">Benchmark Results Summary</h3>
                  
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Overall Accuracy</dt>
                      <dd className="font-medium">{(result.accuracy * 100).toFixed(1)}%</dd>
                    </div>
                    
                    <div>
                      <dt className="text-muted-foreground">Issue Detection</dt>
                      <dd className="font-medium">
                        {result.issueDetectionCount} of {result.issueDetectionTotal} issues
                      </dd>
                    </div>
                    
                    <div>
                      <dt className="text-muted-foreground">Issue Location</dt>
                      <dd className="font-medium">
                        {result.issueLocationCount} of {result.issueLocationTotal} issues
                      </dd>
                    </div>
                    
                    <div>
                      <dt className="text-muted-foreground">Summary Accuracy</dt>
                      <dd className="font-medium">
                        {result.summaryCount} of {result.summaryTotal} issues
                      </dd>
                    </div>
                    
                    <div>
                      <dt className="text-muted-foreground">Redlining Accuracy</dt>
                      <dd className="font-medium">
                        {result.redliningCount} of {result.redliningTotal} issues
                      </dd>
                    </div>
                  </dl>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Issue Detection Accuracy</span>
                      <span>
                        {result.issueDetectionCount} / {result.issueDetectionTotal}
                        ({(result.issueDetectionCount / result.issueDetectionTotal * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <Progress 
                      value={(result.issueDetectionCount / result.issueDetectionTotal) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Issue Location Accuracy</span>
                      <span>
                        {result.issueLocationCount} / {result.issueLocationTotal}
                        ({(result.issueLocationCount / result.issueLocationTotal * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <Progress 
                      value={(result.issueLocationCount / result.issueLocationTotal) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Summary Accuracy</span>
                      <span>
                        {result.summaryCount} / {result.summaryTotal}
                        ({(result.summaryCount / result.summaryTotal * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <Progress 
                      value={(result.summaryCount / result.summaryTotal) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Redlining Accuracy</span>
                      <span>
                        {result.redliningCount} / {result.redliningTotal}
                        ({(result.redliningCount / result.redliningTotal * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <Progress 
                      value={(result.redliningCount / result.redliningTotal) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
                
                <div className="text-sm pt-2">
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
