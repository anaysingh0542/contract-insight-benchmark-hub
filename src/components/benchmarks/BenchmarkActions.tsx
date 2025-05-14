
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Document } from "@/types";
import { useState } from "react";
import { benchmarkService } from "@/services/benchmarkService";
import { toast } from "sonner";

interface BenchmarkActionsProps {
  document: Document;
  onBenchmarkStarted: () => void;
}

export function BenchmarkActions({ document, onBenchmarkStarted }: BenchmarkActionsProps) {
  const [loading, setLoading] = useState(false);
  
  const canStartBenchmark = document.goldenDatasetCreated && 
    document.playbookId && 
    document.status !== "benchmarking";
    
  const handleStartBenchmark = async () => {
    try {
      setLoading(true);
      await benchmarkService.startBenchmark(document.id);
      onBenchmarkStarted();
    } catch (error) {
      toast.error("Failed to start benchmarking");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Benchmark Document</CardTitle>
        <CardDescription>
          Start the benchmarking process for this document
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            Benchmarking will compare the AI review results with your golden dataset, 
            providing insights into the accuracy and effectiveness of the AI model.
          </p>
          
          {!document.goldenDatasetCreated && (
            <div className="text-sm text-amber-600">
              ⚠️ This document doesn't have a golden dataset. Label it in the Word Add-in first.
            </div>
          )}
          
          {!document.playbookId && (
            <div className="text-sm text-amber-600">
              ⚠️ This document doesn't have an assigned playbook.
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={!canStartBenchmark || loading}
          onClick={handleStartBenchmark}
        >
          {loading ? "Starting..." : "Start Benchmark"}
        </Button>
      </CardFooter>
    </Card>
  );
}
