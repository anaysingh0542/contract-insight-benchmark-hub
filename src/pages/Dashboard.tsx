
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentBenchmarks } from "@/components/dashboard/RecentBenchmarks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { documentService } from "@/services/documentService";
import { mockStats } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { FileText, Upload } from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();
  
  const stats = mockStats;
  const recentDocuments = documentService.getAllDocuments().slice(0, 5);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate("/documents")}
          >
            <FileText className="mr-2 h-4 w-4" />
            View Documents
          </Button>
          <Button 
            onClick={() => navigate("/upload")}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>
      
      <DashboardStats stats={stats} />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>
              Recently uploaded documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.length > 0 ? (
                recentDocuments.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="flex items-center justify-between"
                    onClick={() => navigate(`/documents/${doc.id}`)}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.playbookId ? "Playbook assigned" : "No playbook"}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No documents</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <RecentBenchmarks benchmarks={stats.recentBenchmarks} />
      </div>
    </div>
  );
}
