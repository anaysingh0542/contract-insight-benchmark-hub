
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { documentService } from "@/services/documentService";
import { format } from "date-fns";
import { BookOpen, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PlaybooksPage() {
  const playbooks = documentService.getAllPlaybooks();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Playbooks</h1>
        <Button>
          <BookOpen className="mr-2 h-4 w-4" />
          New Playbook
        </Button>
      </div>
      
      {playbooks.length === 0 ? (
        <div className="text-center py-10">
          <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">No playbooks</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a playbook to get started
          </p>
          <Button className="mt-4">
            Create Playbook
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {playbooks.map((playbook) => (
            <Card key={playbook.id} className="overflow-hidden">
              <CardHeader className="bg-muted pb-2">
                <div className="font-medium">{playbook.name}</div>
                <div className="text-sm text-muted-foreground">
                  {playbook.issueCount} issues · Updated {format(playbook.lastUpdated, "PP")}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm mb-4">{playbook.description}</p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm">
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
