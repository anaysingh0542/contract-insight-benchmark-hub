
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Eye } from 'lucide-react';

interface ComparisonItem {
  id: string;
  issueType: string;
  location: string;
  aiDetected: boolean;
  goldenDataset: boolean;
  context: string;
  confidence?: number;
}

interface ComparisonViewProps {
  documentName: string;
  playbookName: string;
  comparisons: ComparisonItem[];
}

export function ComparisonView({ documentName, playbookName, comparisons }: ComparisonViewProps) {
  const truePositives = comparisons.filter(item => item.aiDetected && item.goldenDataset);
  const falsePositives = comparisons.filter(item => item.aiDetected && !item.goldenDataset);
  const falseNegatives = comparisons.filter(item => !item.aiDetected && item.goldenDataset);

  const getStatusBadge = (item: ComparisonItem) => {
    if (item.aiDetected && item.goldenDataset) {
      return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Correct Detection</Badge>;
    } else if (item.aiDetected && !item.goldenDataset) {
      return <Badge variant="destructive">False Positive</Badge>;
    } else if (!item.aiDetected && item.goldenDataset) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Missed Detection</Badge>;
    }
    return null;
  };

  const getStatusIcon = (item: ComparisonItem) => {
    if (item.aiDetected && item.goldenDataset) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else if (item.aiDetected && !item.goldenDataset) {
      return <XCircle className="h-4 w-4 text-red-600" />;
    } else if (!item.aiDetected && item.goldenDataset) {
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">AI vs Golden Dataset Comparison</h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span><strong>Document:</strong> {documentName}</span>
          <span><strong>Playbook:</strong> {playbookName}</span>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              Correct Detections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{truePositives.length}</div>
            <p className="text-sm text-green-600">Issues found by both AI and expert</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-red-800">
              <XCircle className="h-5 w-5" />
              Incorrect Detections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{falsePositives.length}</div>
            <p className="text-sm text-red-600">Issues flagged incorrectly by AI</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Missed Detections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">{falseNegatives.length}</div>
            <p className="text-sm text-yellow-600">Issues missed by AI</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Detailed Issue Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comparisons.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item)}
                      <h4 className="font-medium">{item.issueType}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                  {getStatusBadge(item)}
                </div>
                
                <div className="bg-muted/30 p-3 rounded text-sm">
                  <p><strong>Context:</strong> {item.context}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.goldenDataset ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    <span>Golden Dataset: {item.goldenDataset ? 'Flagged' : 'Not Flagged'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.aiDetected ? 'bg-purple-500' : 'bg-gray-300'}`} />
                    <span>AI Detection: {item.aiDetected ? 'Flagged' : 'Not Flagged'}</span>
                    {item.confidence && <span className="text-muted-foreground">({Math.round(item.confidence * 100)}% confidence)</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
