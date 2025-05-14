
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { documentService } from "@/services/documentService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function DocumentUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      setUploading(true);
      await documentService.uploadDocument(file);
      navigate("/documents");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>
          Upload a document to begin the benchmarking process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Select Document</Label>
            <Input
              id="file"
              type="file"
              accept=".doc,.docx,.pdf"
              onChange={handleFileChange}
            />
            <p className="text-sm text-muted-foreground">
              Supported formats: .doc, .docx, .pdf
            </p>
          </div>
          
          {file && (
            <div className="space-y-1">
              <p className="text-sm font-medium">Selected File:</p>
              <p className="text-sm">{file.name}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpload} 
          disabled={!file || uploading}
          className="w-full"
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </Button>
      </CardFooter>
    </Card>
  );
}
