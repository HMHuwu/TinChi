import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { StatusBadge } from '../components/StatusBadge';
import { Breadcrumb } from '../components/Breadcrumb';
import * as Tabs from '@radix-ui/react-tabs';
import { ArrowLeft, Mail, Phone, GraduationCap, BookOpen } from 'lucide-react';
import { getStudentById, getStudentCourses, getAvailableCourses } from '../data/mockData';

export function StudentDetail() {
  const { id } = useParams();
  const student = getStudentById(id!);
  const [refreshKey, setRefreshKey] = useState(0);

  if (!student) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-xl text-foreground mb-2">Không tìm thấy sinh viên</h2>
          <Link to="/admin/students">
            <Button variant="primary">Quay lại danh sách</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const studentCourses = getStudentCourses(student.id);
  const completedCourses = studentCourses.filter(sc => sc.status === 'completed');
  const registeredCourses = studentCourses.filter(sc => sc.status === 'registered');
  const availableCourses = getAvailableCourses(student.id);

  const handleRegister = (courseId: string) => {
    alert(`Đăng ký học phần thành công!`);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <Link to="/admin/students">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách
            </Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <span className="text-2xl text-primary-foreground">
                  {student.name.split(' ').pop()?.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl text-foreground mb-1">{student.name}</h1>
                <p className="text-lg text-primary mb-2">{student.code}</p>
                <StatusBadge status={student.status} />
              </div>
            </div>
            <Link to={`/admin/students/${student.id}/edit`}>
              <Button variant="outline">Chỉnh sửa thông tin</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground">{student.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Số điện thoại</p>
                  <p className="text-sm text-foreground">{student.phone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Ngành</p>
                  <p className="text-sm text-foreground">{student.major}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Chương trình đào tạo</p>
                  <p className="text-sm text-foreground">{student.program}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs.Root defaultValue="completed" className="bg-card border border-border rounded-lg">
          <Tabs.List className="flex border-b border-border">
            <Tabs.Trigger
              value="completed"
              className="px-6 py-3 text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary transition-colors hover:bg-secondary"
            >
              Học phần đã học ({completedCourses.length})
            </Tabs.Trigger>
            <Tabs.Trigger
              value="registered"
              className="px-6 py-3 text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary transition-colors hover:bg-secondary"
            >
              Học phần đã đăng ký ({registeredCourses.length})
            </Tabs.Trigger>
            <Tabs.Trigger
              value="available"
              className="px-6 py-3 text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary transition-colors hover:bg-secondary"
            >
              Học phần chưa học ({availableCourses.length})
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="completed" className="p-6">
            <Table
              columns={[
                { key: 'code', label: 'Mã học phần' },
                { key: 'name', label: 'Tên học phần' },
                { key: 'semester', label: 'Học kỳ' },
                { key: 'grade', label: 'Điểm' },
                { key: 'status', label: 'Trạng thái' },
              ]}
              data={completedCourses}
              renderRow={(sc) => (
                <tr key={sc.courseId} className="hover:bg-secondary/50">
                  <td className="px-6 py-4 text-sm text-primary">{sc.course.code}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{sc.course.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{sc.semester}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${sc.grade && sc.grade >= 5 ? 'text-green-600' : 'text-red-600'}`}>
                      {sc.grade?.toFixed(1) || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={sc.status} />
                  </td>
                </tr>
              )}
            />
          </Tabs.Content>

          <Tabs.Content value="registered" className="p-6">
            <Table
              columns={[
                { key: 'code', label: 'Mã học phần' },
                { key: 'name', label: 'Tên học phần' },
                { key: 'semester', label: 'Học kỳ' },
                { key: 'status', label: 'Trạng thái' },
              ]}
              data={registeredCourses}
              renderRow={(sc) => (
                <tr key={sc.courseId} className="hover:bg-secondary/50">
                  <td className="px-6 py-4 text-sm text-primary">{sc.course.code}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{sc.course.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{sc.semester}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={sc.status} />
                  </td>
                </tr>
              )}
            />
          </Tabs.Content>

          <Tabs.Content value="available" className="p-6">
            <Table
              columns={[
                { key: 'code', label: 'Mã học phần' },
                { key: 'name', label: 'Tên học phần' },
                { key: 'credits', label: 'Số tín chỉ' },
                { key: 'semester', label: 'Học kỳ mở' },
                { key: 'actions', label: 'Thao tác' },
              ]}
              data={availableCourses}
              renderRow={(course) => (
                <tr key={course.id} className="hover:bg-secondary/50">
                  <td className="px-6 py-4 text-sm text-primary">{course.code}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{course.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{course.credits}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{course.semester}</td>
                  <td className="px-6 py-4">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleRegister(course.id)}
                    >
                      Đăng ký
                    </Button>
                  </td>
                </tr>
              )}
            />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Layout>
  );
}