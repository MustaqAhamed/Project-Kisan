
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AreaChart, Camera, History, MessageSquare, Bot, Landmark, Languages } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage, LanguageProvider } from '@/hooks/use-language';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

function AppLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { language, setLanguage, translations } = useLanguage();

  const navItems = [
    { href: '/', label: 'expertSystem', icon: MessageSquare, tooltip: 'Get AI-powered advice' },
    { href: '/analyzer', label: 'visualAnalyzer', icon: Camera, tooltip: 'Analyze crop images' },
    { href: '/prices', label: 'mandiPrices', icon: AreaChart, tooltip: 'View market prices' },
    { href: '/schemes', label: 'kishanMitro', icon: Landmark, tooltip: 'Find relevant government schemes' },
    { href: '/history', label: 'userHistory', icon: History, tooltip: 'Review past activity' },
  ];

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <Bot className="h-6 w-6" />
                </div>
                <h1 className="font-headline text-xl font-semibold tracking-tight">
                Project Kisan
                </h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.tooltip }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{translations.sidebar[item.label as keyof typeof translations.sidebar]}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 p-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="profile picture" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-medium">Anand Kumar</span>
              <span className="truncate text-xs text-muted-foreground">anand.kumar@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-grow" />
           <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Languages className="h-[1.2rem] w-[1.2rem]" />
                        <span className="sr-only">Select Language</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLanguage('en')}>
                        English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('hi')}>
                        हिन्दी (Hindi)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('kn')}>
                        ಕನ್ನಡ (Kannada)
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">
            {children}
        </main>
      </SidebarInset>
    </>
  );
}


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
        <SidebarProvider>
            <AppLayoutContent>{children}</AppLayoutContent>
        </SidebarProvider>
    </LanguageProvider>
  );
}
