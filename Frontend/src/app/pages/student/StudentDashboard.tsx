import { StudentLayout } from '../../components/StudentLayout';
import { StatsCard } from '../../components/StatsCard';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import { getStudentCourses } from '../../data/mockData';

export function StudentDashboard() {
  // Using student ID 1 (Nguyễn Văn An) for demo
  const studentId = '1';
  const studentCourses = getStudentCourses(studentId);
  
  const completedCourses = studentCourses.filter(sc => sc.status === 'completed');
  const registeredCourses = studentCourses.filter(sc => sc.status === 'registered');
  
  const totalCredits = completedCourses.reduce((sum, sc) => sum + sc.course.credits, 0);
  const totalCompleted = completedCourses.length;
  const currentCourses = registeredCourses.length;

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-foreground mb-2">Chào mừng, Nguyễn Văn An</h1>
          <p className="text-muted-foreground">Tổng quan học tập của bạn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Tổng tín chỉ đã học"
            value={totalCredits}
            icon={BookOpen}
            trend="Tín chỉ"
            trendUp={true}
          />
          
          <StatsCard
            title="Số học phần đã hoàn thành"
            value={totalCompleted}
            icon={CheckCircle}
            trend="Học phần"
            trendUp={true}
          />
          
          <StatsCard
            title="Học phần đang học"
            value={currentCourses}
            icon={Clock}
            trend="Học kỳ hiện tại"
            trendUp={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg mb-4">Học phần đang học</h3>
            {registeredCourses.length > 0 ? (
              <div className="space-y-3">
                {registeredCourses.map((sc) => (
                  <div key={sc.courseId} className="p-4 bg-secondary rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-primary">{sc.course.code}</p>
                        <p className="mt-1">{sc.course.name}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{sc.course.credits} TC</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{sc.semester}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Chưa có học phần đang học
              </p>
            )}
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg mb-4">Kết quả học tập gần đây</h3>
            {completedCourses.length > 0 ? (
              <div className="space-y-3">
                {completedCourses.slice(-3).reverse().map((sc) => (
                  <div key={sc.courseId} className="p-4 bg-secondary rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-primary">{sc.course.code}</p>
                        <p className="mt-1">{sc.course.name}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg ${
                          sc.grade && sc.grade >= 8 ? 'text-green-600' :
                          sc.grade && sc.grade >= 5 ? 'text-foreground' :
                          'text-destructive'
                        }`}>
                          {sc.grade?.toFixed(1) || '-'}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{sc.semester}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Chưa có kết quả học tập
              </p>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg mb-4">Thông báo</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">Lịch đăng ký học phần học kỳ 2025-2026 HK2</p>
                <p className="text-xs text-muted-foreground mt-1">Thời gian: 01/04/2026 - 15/04/2026</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">Thông báo nghỉ lễ 30/4 - 1/5</p>
                <p className="text-xs text-muted-foreground mt-1">Trường nghỉ từ 29/04 đến 02/05/2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
