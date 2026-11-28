"use client";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { Onderbalk } from "../components/Onderbalk";
import { Toaster } from "@/components/ui/sonner";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { FeedbackButton } from "../components/FeedbackButton";
import { AdminTheme } from "../components/AdminTheme";

function CustomSidebarTrigger() {
  const { toggleSidebar, openMobile, isMobile, open } = useSidebar();
  const isOpen = isMobile ? openMobile : open;
  return (
    <button
      onClick={toggleSidebar}
      className="p-2 rounded-md hover:bg-muted text-muted-foreground">
      {isOpen ? <X size={22} /> : <Menu size={22} />}
    </button>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") return <>{children}</>;
  // Beginscherm: nog geen menu, alleen het logo bovenaan en de keuze.
  if (pathname === "/admin")
    return (
      <div className="min-h-screen bg-background">
        <header className="flex h-16 items-center border-b border-border bg-card px-4 md:h-20 md:px-8">
          <img src="/bartmooi-logo-1.png" alt="BartMooi" className="h-9 w-auto md:h-11" />
        </header>
        <div className="p-4 md:p-8">{children}</div>
      </div>
    );

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-w-0 flex flex-col min-h-screen bg-background">
        <header className="h-14 md:h-20 bg-card border-b border-border px-3 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <CustomSidebarTrigger />
          </div>
          <div className="flex items-center gap-3">
          <AdminTheme />
          </div>
        </header>
        <div className="flex-1 p-4 pb-24 md:p-8">{children}</div>
      </main>
      <Onderbalk />
      <Toaster position="top-right" richColors />
      <FeedbackButton />
    </SidebarProvider>
  );
}
