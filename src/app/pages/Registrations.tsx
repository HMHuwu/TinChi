import { useState } from 'react';
import { Layout } from '../components/Layout';
import { SearchBar } from '../components/SearchBar';
import { Table } from '../components/Table';
import { StatusBadge } from '../components/StatusBadge';
import { students, courses, studentCourses } from '../data/mockData';

export function Registrations() {
  const [searchTerm, setSearchTerm] = useState('');

  const enrichedRegistrations = studentCourses.map(sc => ({
    ...sc,
    student: students.find(s => s.id === sc.studentId)!,
    course: courses.find(c => c.id === sc.courseId)!,
  }));

  const filteredRegistrations = enrichedRegistrations.filter(reg =>
    reg.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.student.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'studentCode', label: 'Mã SV' },
    { key: 'studentName', label: 'Sinh viên' },
    { key: 'courseCode', label: 'Mã học phần' },
    { key: 'courseName', label: 'Tên học phần' },
    { key: 'semester', label: 'Học kỳ' },
    { key: 'status', label: 'Trạng thái' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-foreground mb-2">Đăng ký học phần</h1>
          <p className="text-muted-foreground">Quản lý toàn bộ đăng ký học phần của sinh viên</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-1">Tổng đăng ký</p>
            <h3 className="text-3xl text-foreground">{studentCourses.length}</h3>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-1">Đã hoàn thành</p>
            <h3 className="text-3xl text-green-600">
              {studentCourses.filter(sc => sc.status === 'completed').length}
            </h3>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-1">Đang học</p>
            <h3 className="text-3xl text-blue-600">
              {studentCourses.filter(sc => sc.status === 'registered').length}
            </h3>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <SearchBar 
              placeholder="Tìm kiếm theo sinh viên, học phần..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          <Table
            columns={columns}
            data={filteredRegistrations}
            renderRow={(reg) => (
              <tr key={`${reg.studentId}-${reg.courseId}`} className="hover:bg-secondary/50 transition-colors">
                <td className="px-6 py-4 text-sm text-primary">{reg.student.code}</td>
                <td className="px-6 py-4 text-sm text-foreground">{reg.student.name}</td>
                <td className="px-6 py-4 text-sm text-primary">{reg.course.code}</td>
                <td className="px-6 py-4 text-sm text-foreground">{reg.course.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{reg.semester}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={reg.status} />
                </td>
              </tr>
            )}
          />

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <p>Hiển thị {filteredRegistrations.length} đăng ký</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
