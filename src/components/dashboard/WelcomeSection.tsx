
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function WelcomeSection() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 mb-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Legal AI Benchmarking Platform
        </h1>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          Create golden datasets, benchmark AI performance, and track improvements in contract redlining accuracy. 
          Build confidence in AI-assisted legal review with precise measurement and continuous improvement.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 cursor-pointer" 
                onClick={() => navigate('/upload')}>
            <CardContent className="p-4 text-center">
              <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">Upload Document</h3>
              <p className="text-xs text-muted-foreground">Start with a new contract</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/documents')}>
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">Manage Documents</h3>
              <p className="text-xs text-muted-foreground">View and organize files</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/benchmarks')}>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">View Benchmarks</h3>
              <p className="text-xs text-muted-foreground">Analyze AI performance</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/playbooks')}>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">Playbooks</h3>
              <p className="text-xs text-muted-foreground">Review rule sets</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
