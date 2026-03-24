import { ReactNode } from 'react';
import { StudentSidebar } from './StudentSidebar';
import { Topbar } from './Topbar';

interface StudentLayoutProps {
  children: ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar />
      <Topbar />
      <main className="ml-0 md:ml-64 pt-16 min-h-screen">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
