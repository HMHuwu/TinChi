import { Layout } from '../components/Layout';
import { StatsCard } from '../components/StatsCard';
import { Users, BookOpen, ClipboardList, GraduationCap } from 'lucide-react';
import { students, courses, studentCourses } from '../data/mockData';

export function Dashboard() {
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const totalCourses = courses.length;
  const totalRegistrations = studentCourses.length;
  const totalPrograms = [...new Set(students.map(s => s.program))].length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-foreground mb-2">Bảng điều khiển</h1>
          <p className="text-muted-foreground">Tổng quan hệ thống quản lý đăng ký học phần</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Tổng sinh viên"
            value={totalStudents}
            icon={Users}
            trend={`${activeStudents} đang học`}
            trendUp={true}
          />
          
          <StatsCard
            title="Tổng học phần"
            value={totalCourses}
            icon={BookOpen}
            trend="Tất cả khóa học"
            trendUp={true}
          />
          
          <StatsCard
            title="Tổng đăng ký"
            value={totalRegistrations}
            icon={ClipboardList}
            trend="Học kỳ hiện tại"
            trendUp={true}
          />
          
          <StatsCard
            title="Chương trình đào tạo"
            value={totalPrograms}
            icon={GraduationCap}
            trend="Đang hoạt động"
            trendUp={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg mb-4">Sinh viên theo chương trình</h3>
            <div className="space-y-4">
              {[...new Set(students.map(s => s.program))].map(program => {
                const count = students.filter(s => s.program === program).length;
                const percentage = (count / totalStudents) * 100;
                
                return (
                  <div key={program}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-foreground">{program}</span>
                      <span className="text-sm text-muted-foreground">{count} sinh viên</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg mb-4">Sinh viên theo ngành</h3>
            <div className="space-y-4">
              {[...new Set(students.map(s => s.major))].map(major => {
                const count = students.filter(s => s.major === major).length;
                const percentage = (count / totalStudents) * 100;
                
                return (
                  <div key={major}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-foreground">{major}</span>
                      <span className="text-sm text-muted-foreground">{count} sinh viên</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-accent rounded-full h-2 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Nguyễn Văn An đã đăng ký học phần IT301 - Công nghệ web</p>
                <p className="text-xs text-muted-foreground">2 giờ trước</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Trần Thị Bình đã hoàn thành học phần IT202 - Cơ sở dữ liệu</p>
                <p className="text-xs text-muted-foreground">5 giờ trước</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Lê Hoàng Công đã đăng ký học phần IT203 - Mạng máy tính</p>
                <p className="text-xs text-muted-foreground">1 ngày trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
