import { useState } from 'react';
import { Layout } from '../components/Layout';
import { SearchBar } from '../components/SearchBar';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { Save } from 'lucide-react';
import { students, courses, studentCourses as initialStudentCourses } from '../data/mockData';

interface EditableGrade {
  studentId: string;
  courseId: string;
  grade: number | undefined;
}

export function GradeManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingGrades, setEditingGrades] = useState<Map<string, number>>(new Map());

  const enrichedData = initialStudentCourses
    .filter(sc => sc.status === 'completed')
    .map(sc => ({
      ...sc,
      student: students.find(s => s.id === sc.studentId)!,
      course: courses.find(c => c.id === sc.courseId)!,
    }));

  const filteredData = enrichedData.filter(item =>
    item.course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.student.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGradeChange = (studentId: string, courseId: string, value: string) => {
    const key = `${studentId}-${courseId}`;
    const numValue = parseFloat(value);
    
    if (value === '' || isNaN(numValue)) {
      setEditingGrades(prev => {
        const newMap = new Map(prev);
        newMap.delete(key);
        return newMap;
      });
    } else {
      setEditingGrades(prev => new Map(prev).set(key, numValue));
    }
  };

  const handleSave = (studentId: string, courseId: string) => {
    const key = `${studentId}-${courseId}`;
    const newGrade = editingGrades.get(key);
    
    if (newGrade !== undefined) {
      alert(`Đã lưu điểm ${newGrade.toFixed(1)} cho sinh viên!`);
      setEditingGrades(prev => {
        const newMap = new Map(prev);
        newMap.delete(key);
        return newMap;
      });
    }
  };

  const columns = [
    { key: 'courseCode', label: 'Mã học phần' },
    { key: 'courseName', label: 'Tên học phần' },
    { key: 'student', label: 'Sinh viên' },
    { key: 'semester', label: 'Học kỳ' },
    { key: 'grade', label: 'Điểm' },
    { key: 'status', label: 'Trạng thái' },
    { key: 'actions', label: 'Thao tác' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-foreground mb-2">Quản lý điểm</h1>
          <p className="text-muted-foreground">Cập nhật và quản lý điểm học phần của sinh viên</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <SearchBar 
              placeholder="Tìm kiếm theo mã học phần, tên học phần, sinh viên..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          <Table
            columns={columns}
            data={filteredData}
            renderRow={(item) => {
              const key = `${item.studentId}-${item.courseId}`;
              const editingGrade = editingGrades.get(key);
              const displayGrade = editingGrade !== undefined ? editingGrade : item.grade;
              const isEditing = editingGrades.has(key);

              return (
                <tr key={key} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-primary">{item.course.code}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{item.course.name}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-foreground">{item.student.name}</p>
                      <p className="text-xs text-muted-foreground">{item.student.code}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.semester}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={displayGrade !== undefined ? displayGrade : ''}
                      onChange={(e) => handleGradeChange(item.studentId, item.courseId, e.target.value)}
                      className={`
                        w-20 px-3 py-1.5 border rounded text-sm
                        focus:outline-none focus:ring-2 focus:ring-ring
                        ${displayGrade !== undefined && displayGrade >= 5 ? 'text-green-600' : 'text-red-600'}
                        ${isEditing ? 'border-primary bg-primary/5' : 'border-input'}
                      `}
                      placeholder="0.0"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge 
                      status={displayGrade !== undefined && displayGrade >= 5 ? 'completed' : 'failed'} 
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleSave(item.studentId, item.courseId)}
                      disabled={!isEditing}
                    >
                      <Save className="w-4 h-4 mr-1.5" />
                      Lưu
                    </Button>
                  </td>
                </tr>
              );
            }}
          />

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <p>Hiển thị {filteredData.length} bản ghi</p>
            <p className="text-xs">Nhập điểm từ 0.0 đến 10.0</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
