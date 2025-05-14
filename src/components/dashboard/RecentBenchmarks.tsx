
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BenchmarkResult } from "@/types";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { benchmarkService } from "@/services/benchmarkService";
import { toast } from "sonner";

interface RecentBenchmarksProps {
  benchmarks: BenchmarkResult[];
}

export function RecentBenchmarks({ benchmarks }: RecentBenchmarksProps) {
  const handleDownloadReport = async (benchmarkId: string, documentId: string) => {
    try {
      await benchmarkService.downloadReport(benchmarkId, documentId);
      toast.success("Download started");
    } catch (error) {
      toast.error("Failed to download report");
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Recent Benchmarks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {benchmarks.map((benchmark) => (
            <div key={benchmark.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {(benchmark as any).documentName || `Document ${benchmark.documentId}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(benchmark.date, 'PPP')} · Accuracy: {(benchmark.accuracy * 100).toFixed(1)}%
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleDownloadReport(benchmark.id, benchmark.documentId)}
                  title="Download Report"
                >
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download Report</span>
                </Button>
              </div>
            </div>
          ))}
          {benchmarks.length === 0 && (
            <div className="flex items-center justify-center h-24">
              <p className="text-muted-foreground">No recent benchmarks</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
