
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/Dashboard";
import DocumentsPage from "./pages/Documents";
import DocumentDetailsPage from "./pages/DocumentDetails";
import PlaybooksPage from "./pages/Playbooks";
import UploadPage from "./pages/Upload";
import BenchmarksPage from "./pages/Benchmarks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="documents/:id" element={<DocumentDetailsPage />} />
            <Route path="playbooks" element={<PlaybooksPage />} />
            <Route path="benchmarks" element={<BenchmarksPage />} />
            <Route path="upload" element={<UploadPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
