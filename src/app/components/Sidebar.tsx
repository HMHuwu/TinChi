import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap, 
  ClipboardList,
  Award
} from 'lucide-react';

const menuItems = [
  { path: '/admin/dashboard', label: 'Bảng điều khiển', icon: LayoutDashboard },
  { path: '/admin/students', label: 'Sinh viên', icon: Users },
  { path: '/admin/programs', label: 'Chương trình đào tạo', icon: GraduationCap },
  { path: '/admin/courses', label: 'Học phần', icon: BookOpen },
  { path: '/admin/registrations', label: 'Đăng ký học phần', icon: ClipboardList },
  { path: '/admin/grades', label: 'Quản lý điểm', icon: Award },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex w-64 bg-card border-r border-border h-screen fixed left-0 top-0 flex-col overflow-hidden">
      <div className="p-6 border-b border-border flex-shrink-0">
        <h1 className="text-xl text-primary flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          Quản lý học phần
        </h1>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '/' 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            
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