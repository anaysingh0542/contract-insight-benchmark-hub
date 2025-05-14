
import { cn } from "@/lib/utils";
import { 
  Sidebar as ShadcnSidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { 
  BookOpen, 
  FileText, 
  ChartBar, 
  LayoutDashboard, 
  Upload,
  Settings
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <ShadcnSidebar>
      <SidebarHeader className="flex items-center px-5 py-4">
        <h2 className="text-xl font-bold text-white">Legal Benchmarking</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/") && "bg-sidebar-accent")}>
                  <Link to="/">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/documents") && "bg-sidebar-accent")}>
                  <Link to="/documents">
                    <FileText className="h-5 w-5" />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/playbooks") && "bg-sidebar-accent")}>
                  <Link to="/playbooks">
                    <BookOpen className="h-5 w-5" />
                    <span>Playbooks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/benchmarks") && "bg-sidebar-accent")}>
                  <Link to="/benchmarks">
                    <ChartBar className="h-5 w-5" />
                    <span>Benchmarks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/upload") && "bg-sidebar-accent")}>
                  <Link to="/upload">
                    <Upload className="h-5 w-5" />
                    <span>Upload Document</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/settings") && "bg-sidebar-accent")}>
                  <Link to="/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-5 py-3">
        <div className="text-xs text-sidebar-foreground/70">
          Legal Benchmarking Tool v1.0
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
