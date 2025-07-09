import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { documentService } from '@/services/documentService';
import { Upload, FileText, X, AlertCircle, CheckCircle, HelpCircle, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function EnhancedDocumentUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [datasetName, setDatasetName] = useState('');
  const [selectedPlaybook, setSelectedPlaybook] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const playbooks = documentService.getAllPlaybooks();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelection = (selectedFile: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error('Please select a PDF or Word document');
      return;
    }
    
    if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
      toast.error('File size must be less than 50MB');
      return;
    }
    
    setFile(selectedFile);
    if (!datasetName) {
      setDatasetName(selectedFile.name.replace(/\.[^/.]+$/, "") + " - Golden Dataset");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setDatasetName('');
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a document to upload");
      return;
    }
    
    if (!selectedPlaybook) {
      toast.error("Please select a playbook");
      return;
    }
    
    if (!datasetName.trim()) {
      toast.error("Please provide a name for your golden dataset");
      return;
    }

    try {
      setUploading(true);
      await documentService.uploadDocument(file);
      toast.success("Document uploaded successfully! You can now begin creating your golden dataset.");
      navigate("/documents");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload document. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Create New Golden Dataset</h2>
        <p className="text-muted-foreground">
          Upload a contract document and associate it with a playbook to begin creating your definitive benchmark
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Upload
          </CardTitle>
          <CardDescription>
            Select a contract document (.pdf, .doc, .docx) to create your golden dataset from
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-primary bg-primary/5'
                : file
                ? 'border-green-500 bg-green-500/5'
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Drop your contract here</h3>
                <p className="text-muted-foreground mb-4">or click to browse your files</p>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button variant="outline" asChild className="cursor-pointer">
                    <span>Choose File</span>
                  </Button>
                </Label>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported formats: PDF, DOC, DOCX • Max size: 50MB
                </p>
              </>
            ) : (
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="text-left">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)} • {file.type.includes('pdf') ? 'PDF' : 'Word Document'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Golden Dataset Configuration */}
          {file && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Golden Dataset Configuration
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataset-name">
                    Dataset Name *
                  </Label>
                  <Input
                    id="dataset-name"
                    value={datasetName}
                    onChange={(e) => setDatasetName(e.target.value)}
                    placeholder="e.g., Q4 MSA Benchmark - Final"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="playbook-select" className="flex items-center gap-1">
                    Playbook *
                    <HelpCircle className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Select value={selectedPlaybook} onValueChange={setSelectedPlaybook}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a playbook" />
                    </SelectTrigger>
                    <SelectContent>
                      {playbooks.map((playbook) => (
                        <SelectItem key={playbook.id} value={playbook.id}>
                          {playbook.name} ({playbook.issueCount} issues)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add any notes or context about this golden dataset..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/documents')}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!file || !selectedPlaybook || !datasetName.trim() || uploading}
            className="min-w-[140px]"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              'Review & Redline'
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-900">Next Steps</p>
              <p className="text-sm text-blue-700">
                After uploading, you'll be directed to the redlining interface where you can manually mark issues 
                and create your golden dataset. This will serve as the benchmark for AI performance evaluation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
