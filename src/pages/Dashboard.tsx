
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentBenchmarks } from "@/components/dashboard/RecentBenchmarks";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { documentService } from "@/services/documentService";
import { mockStats } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, Clock, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();
  
  const stats = mockStats;
  const recentDocuments = documentService.getAllDocuments().slice(0, 3);
  
  return (
    <div className="space-y-8">
      <WelcomeSection />
      
      <DashboardStats stats={stats} />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/documents')}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Documents</CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
              Recently uploaded contracts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDocuments.length > 0 ? (
                recentDocuments.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none truncate">{doc.name}</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          doc.status === 'benchmarked' ? 'bg-green-500' :
                          doc.status === 'labeled' ? 'bg-blue-500' :
                          doc.status === 'benchmarking' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`} />
                        <p className="text-xs text-muted-foreground capitalize">
                          {doc.status.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No documents yet</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={(e) => {
                    e.stopPropagation();
                    navigate('/upload');
                  }}>
                    Upload First Document
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <RecentBenchmarks benchmarks={stats.recentBenchmarks} />

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
              Common tasks and workflows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => navigate('/upload')}
              >
                <Upload className="mr-2 h-4 w-4" />
                Create Golden Dataset
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => navigate('/benchmarks')}
              >
                <Clock className="mr-2 h-4 w-4" />
                View Benchmarks
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => navigate('/playbooks')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Manage Playbooks
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
