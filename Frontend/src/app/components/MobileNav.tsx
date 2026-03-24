import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  ClipboardList,
  Award,
  Menu,
  X,
  User,
} from "lucide-react";

const adminMenuItems = [
  { path: "/admin/dashboard", label: "Bảng điều khiển", icon: LayoutDashboard },
  { path: "/admin/students", label: "Sinh viên", icon: Users },
  // { path: "/admin/programs", label: "Chương trình đào tạo", icon: GraduationCap },
  { path: "/admin/courses", label: "Học phần", icon: BookOpen },
  {
    path: "/admin/registrations",
    label: "Đăng ký học phần",
    icon: ClipboardList,
  },
  { path: "/admin/grades", label: "Quản lý điểm", icon: Award },
];

const studentMenuItems = [
  { path: "/student/dashboard", label: "Trang chủ", icon: LayoutDashboard },
  { path: "/student/my-courses", label: "Học phần của tôi", icon: BookOpen },
  { path: "/student/register", label: "Đăng ký học phần", icon: ClipboardList },
  { path: "/student/results", label: "Kết quả học tập", icon: Award },
  { path: "/student/profile", label: "Thông tin cá nhân", icon: User },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isStudentRoute = location.pathname.startsWith("/student");
  const menuItems = isStudentRoute ? studentMenuItems : adminMenuItems;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-16 left-0 bottom-0 w-64 bg-card border-r border-border z-50 md:hidden overflow-y-auto">
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                          ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-secondary"
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
          </div>
        </>
      )}
    </>
  );
}
