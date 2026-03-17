import { useState } from 'react';
import { Layout } from '../components/Layout';
import { SearchBar } from '../components/SearchBar';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { BookOpen } from 'lucide-react';
import { courses } from '../data/mockData';

export function Courses() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course =>
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.semester.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'code', label: 'Mã học phần' },
    { key: 'name', label: 'Tên học phần' },
    { key: 'credits', label: 'Số tín chỉ' },
    { key: 'semester', label: 'Học kỳ' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-foreground mb-2">Quản lý học phần</h1>
            <p className="text-muted-foreground">Danh sách tất cả học phần trong hệ thống</p>
          </div>
          <Button variant="primary">
            <BookOpen className="w-4 h-4 mr-2" />
            Thêm học phần mới
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <SearchBar 
              placeholder="Tìm kiếm học phần theo mã, tên, hoặc học kỳ..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          <Table
            columns={columns}
            data={filteredCourses}
            renderRow={(course) => (
              <tr key={course.id} className="hover:bg-secondary/50 transition-colors">
                <td className="px-6 py-4 text-sm text-primary">{course.code}</td>
                <td className="px-6 py-4 text-sm text-foreground">{course.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{course.credits} tín chỉ</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{course.semester}</td>
              </tr>
            )}
          />

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <p>Hiển thị {filteredCourses.length} trong tổng số {courses.length} học phần</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
