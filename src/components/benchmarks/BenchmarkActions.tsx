
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Document, DocumentStatus } from "@/types";
import { useState } from "react";
import { benchmarkService } from "@/services/benchmarkService";
import { toast } from "sonner";
import { ChartBar, Edit, Loader } from "lucide-react";

interface BenchmarkActionsProps {
  document: Document;
  onBenchmarkStarted: () => void;
}

export function BenchmarkActions({ document, onBenchmarkStarted }: BenchmarkActionsProps) {
  const [loading, setLoading] = useState(false);
  
  const canStartBenchmark = document.goldenDatasetCreated && 
    document.playbookId && 
    document.status !== DocumentStatus.BENCHMARKING;
    
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

  // For documents without golden dataset or assigned playbook
  if (!document.goldenDatasetCreated || !document.playbookId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Document Preparation</CardTitle>
          <CardDescription>
            This document requires preparation before benchmarking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!document.playbookId && (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-600 font-medium">1</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Assign a Playbook</p>
                  <p className="text-sm text-muted-foreground">
                    Select a playbook to define which issues to analyze
                  </p>
                </div>
              </div>
            )}
            
            {!document.goldenDatasetCreated && (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-600 font-medium">{document.playbookId ? "2" : "1"}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Create Golden Dataset</p>
                  <p className="text-sm text-muted-foreground">
                    Label the document with issue annotations in the Word Add-in
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full"
            variant="outline"
            onClick={() => toast.info("Opening Word Add-in...")}
          >
            <Edit className="mr-2 h-4 w-4" />
            Open in Word Add-in
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // For documents that are currently benchmarking
  if (document.status === DocumentStatus.BENCHMARKING) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Benchmarking in Progress</CardTitle>
          <CardDescription>
            Please wait while the document is being benchmarked
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Loader className="h-6 w-6 text-blue-600 animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Our AI is comparing the document against your golden dataset.
                This may take a few minutes to complete.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // For documents ready for benchmarking
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
          
          <div className="flex items-center space-x-2 mt-4">
            <ChartBar className="h-5 w-5 text-blue-500" />
            <p className="text-sm font-medium">
              Document is ready for benchmarking
            </p>
          </div>
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
