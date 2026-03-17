import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  Award,
  User,
  GraduationCap
} from 'lucide-react';

const menuItems = [
  { path: '/student/dashboard', label: 'Trang chủ', icon: LayoutDashboard },
  { path: '/student/my-courses', label: 'Học phần của tôi', icon: BookOpen },
  { path: '/student/register', label: 'Đăng ký học phần', icon: ClipboardList },
  { path: '/student/results', label: 'Kết quả học tập', icon: Award },
  { path: '/student/profile', label: 'Thông tin cá nhân', icon: User },
];

export function StudentSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex w-64 bg-card border-r border-border h-screen fixed left-0 top-0 flex-col overflow-hidden">
      <div className="p-6 border-b border-border flex-shrink-0">
        <h1 className="text-xl text-primary flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          Cổng sinh viên
        </h1>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-secondary'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border flex-shrink-0">
        <div className="text-xs text-muted-foreground">
          © 2026 Hệ thống quản lý
        </div>
      </div>
    </aside>
  );
}
