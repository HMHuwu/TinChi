import { Bell, User, LogOut } from 'lucide-react';
import { MobileNav } from './MobileNav';
import { useNavigate, useLocation } from 'react-router';

export function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isStudentRoute = location.pathname.startsWith('/student');
  const userName = isStudentRoute ? 'Nguyễn Văn An' : 'Admin User';
  const userRole = isStudentRoute ? 'Sinh viên' : 'Quản trị viên';

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="h-16 bg-card border-b border-border fixed top-0 left-0 md:left-64 right-0 z-10">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <MobileNav />
          <h2 className="text-base md:text-lg text-foreground">Hệ thống quản lý đăng ký học phần</h2>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </button>
          
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right">
              <div className="text-sm">{userName}</div>
              <div className="text-xs text-muted-foreground">{userRole}</div>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}