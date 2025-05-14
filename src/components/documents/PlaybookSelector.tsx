
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Document, Playbook } from "@/types";
import { useState } from "react";
import { documentService } from "@/services/documentService";
import { toast } from "sonner";

interface PlaybookSelectorProps {
  document: Document;
  playbooks: Playbook[];
  onPlaybookAssigned: () => void;
}

export function PlaybookSelector({ document, playbooks, onPlaybookAssigned }: PlaybookSelectorProps) {
  const [selectedPlaybookId, setSelectedPlaybookId] = useState(document.playbookId || "");
  const [assigning, setAssigning] = useState(false);

  const handleAssignPlaybook = async () => {
    if (!selectedPlaybookId) {
      toast.error("Please select a playbook");
      return;
    }

    try {
      setAssigning(true);
      const success = documentService.assignPlaybook(document.id, selectedPlaybookId);
      
      if (success) {
        toast.success("Playbook assigned successfully");
        onPlaybookAssigned();
      } else {
        toast.error("Failed to assign playbook");
      }
    } catch (error) {
      console.error("Error assigning playbook:", error);
      toast.error("An error occurred while assigning the playbook");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Playbook</CardTitle>
        <CardDescription>
          Select a playbook to use for this document
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="playbook-select" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Playbook
            </label>
            <Select
              value={selectedPlaybookId}
              onValueChange={setSelectedPlaybookId}
              disabled={assigning}
            >
              <SelectTrigger id="playbook-select" className="w-full">
                <SelectValue placeholder="Select a playbook" />
              </SelectTrigger>
              <SelectContent position="popper">
                {playbooks.map((playbook) => (
                  <SelectItem key={playbook.id} value={playbook.id}>
                    {playbook.name} ({playbook.issueCount} issues)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedPlaybookId && (
            <div className="space-y-1">
              <p className="text-sm font-medium">Selected Playbook:</p>
              <p className="text-sm">
                {playbooks.find(p => p.id === selectedPlaybookId)?.description}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAssignPlaybook}
          disabled={!selectedPlaybookId || assigning}
          className="w-full"
        >
          {assigning ? "Assigning..." : "Assign Playbook"}
        </Button>
      </CardFooter>
    </Card>
  );
}
