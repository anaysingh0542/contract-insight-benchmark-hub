
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';

// This component serves as our style guide reference
export function StyleGuide() {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">Legal AI Benchmarking Platform</h1>
        <p className="text-lg text-muted-foreground mb-8">Design System & Style Guide</p>
        
        {/* Color Palette */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-primary rounded-lg"></div>
                <p className="text-sm font-medium">Primary</p>
                <p className="text-xs text-muted-foreground">Professional Blue</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-secondary rounded-lg"></div>
                <p className="text-sm font-medium">Secondary</p>
                <p className="text-xs text-muted-foreground">Light Gray</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-accent rounded-lg"></div>
                <p className="text-sm font-medium">Accent</p>
                <p className="text-xs text-muted-foreground">Soft Blue</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-destructive rounded-lg"></div>
                <p className="text-sm font-medium">Destructive</p>
                <p class="text-xs text-muted-foreground">Error Red</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Heading 1 - Page Titles</h1>
              <p className="text-sm text-muted-foreground">font-bold text-4xl</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Heading 2 - Section Titles</h2>
              <p className="text-sm text-muted-foreground">font-semibold text-2xl</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">Heading 3 - Subsections</h3>
              <p className="text-sm text-muted-foreground">font-medium text-lg</p>
            </div>
            <div>
              <p className="text-base text-foreground">Body Text - Regular content</p>
              <p className="text-sm text-muted-foreground">text-base</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Caption Text - Metadata and descriptions</p>
              <p className="text-xs text-muted-foreground">text-sm text-muted-foreground</p>
            </div>
          </CardContent>
        </Card>

        {/* Button Styles */}
        <Card>
          <CardHeader>
            <CardTitle>Button Styles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Primary Large</Button>
              <Button>Primary Default</Button>
              <Button size="sm">Primary Small</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg">Secondary Large</Button>
              <Button variant="secondary">Secondary Default</Button>
              <Button variant="secondary" size="sm">Secondary Small</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="lg">Outline Large</Button>
              <Button variant="outline">Outline Default</Button>
              <Button variant="outline" size="sm">Outline Small</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
