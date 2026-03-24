export interface Student {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  major: string;
  program: string;
  status: 'active' | 'inactive';
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: string;
}

export interface StudentCourse {
  studentId: string;
  courseId: string;
  semester: string;
  grade?: number;
  status: 'completed' | 'registered' | 'pending';
}

export const students: Student[] = [
  {
    id: '1',
    code: 'SV001',
    name: 'Nguyễn Văn An',
    email: 'anvn@university.edu.vn',
    phone: '0123456789',
    major: 'Công nghệ thông tin',
    program: 'Chuẩn',
    status: 'active'
  },
  {
    id: '2',
    code: 'SV002',
    name: 'Trần Thị Bình',
    email: 'binhtt@university.edu.vn',
    phone: '0987654321',
    major: 'Khoa học máy tính',
    program: 'Chất lượng cao',
    status: 'active'
  },
  {
    id: '3',
    code: 'SV003',
    name: 'Lê Hoàng Công',
    email: 'conglh@university.edu.vn',
    phone: '0912345678',
    major: 'Công nghệ thông tin',
    program: 'Chuẩn',
    status: 'active'
  },
  {
    id: '4',
    code: 'SV004',
    name: 'Phạm Thu Dung',
    email: 'dungpt@university.edu.vn',
    phone: '0898765432',
    major: 'An toàn thông tin',
    program: 'Chất lượng cao',
    status: 'active'
  },
  {
    id: '5',
    code: 'SV005',
    name: 'Hoàng Minh Đức',
    email: 'duchm@university.edu.vn',
    phone: '0934567890',
    major: 'Công nghệ thông tin',
    program: 'Chuẩn',
    status: 'inactive'
  }
];

export const courses: Course[] = [
  {
    id: '1',
    code: 'IT101',
    name: 'Nhập môn lập trình',
    credits: 4,
    semester: '2023-2024 HK1'
  },
  {
    id: '2',
    code: 'IT102',
    name: 'Cấu trúc dữ liệu và giải thuật',
    credits: 4,
    semester: '2023-2024 HK2'
  },
  {
    id: '3',
    code: 'IT201',
    name: 'Lập trình hướng đối tượng',
    credits: 3,
    semester: '2024-2025 HK1'
  },
  {
    id: '4',
    code: 'IT202',
    name: 'Cơ sở dữ liệu',
    credits: 3,
    semester: '2024-2025 HK1'
  },
  {
    id: '5',
    code: 'IT203',
    name: 'Mạng máy tính',
    credits: 3,
    semester: '2024-2025 HK2'
  },
  {
    id: '6',
    code: 'IT301',
    name: 'Công nghệ web',
    credits: 4,
    semester: '2025-2026 HK1'
  },
  {
    id: '7',
    code: 'IT302',
    name: 'Phát triển ứng dụng di động',
    credits: 3,
    semester: '2025-2026 HK1'
  },
  {
    id: '8',
    code: 'IT303',
    name: 'Trí tuệ nhân tạo',
    credits: 4,
    semester: '2025-2026 HK2'
  }
];

export const studentCourses: StudentCourse[] = [
  // Student 1 - Nguyễn Văn An
  { studentId: '1', courseId: '1', semester: '2023-2024 HK1', grade: 8.5, status: 'completed' },
  { studentId: '1', courseId: '2', semester: '2023-2024 HK2', grade: 7.8, status: 'completed' },
  { studentId: '1', courseId: '3', semester: '2024-2025 HK1', grade: 9.0, status: 'completed' },
  { studentId: '1', courseId: '4', semester: '2024-2025 HK1', grade: 8.2, status: 'completed' },
  { studentId: '1', courseId: '6', semester: '2025-2026 HK1', status: 'registered' },
  { studentId: '1', courseId: '7', semester: '2025-2026 HK1', status: 'registered' },
  
  // Student 2 - Trần Thị Bình
  { studentId: '2', courseId: '1', semester: '2023-2024 HK1', grade: 9.5, status: 'completed' },
  { studentId: '2', courseId: '2', semester: '2023-2024 HK2', grade: 9.0, status: 'completed' },
  { studentId: '2', courseId: '3', semester: '2024-2025 HK1', grade: 8.8, status: 'completed' },
  { studentId: '2', courseId: '6', semester: '2025-2026 HK1', status: 'registered' },
  
  // Student 3 - Lê Hoàng Công
  { studentId: '3', courseId: '1', semester: '2023-2024 HK1', grade: 7.0, status: 'completed' },
  { studentId: '3', courseId: '2', semester: '2023-2024 HK2', grade: 6.5, status: 'completed' },
  { studentId: '3', courseId: '3', semester: '2024-2025 HK1', status: 'registered' },
  { studentId: '3', courseId: '4', semester: '2024-2025 HK1', status: 'registered' },
];

export function getStudentById(id: string): Student | undefined {
  return students.find(s => s.id === id);
}

export function getCourseById(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}

export function getStudentCourses(studentId: string): (StudentCourse & { course: Course })[] {
  return studentCourses
    .filter(sc => sc.studentId === studentId)
    .map(sc => ({
      ...sc,
      course: getCourseById(sc.courseId)!
    }));
}

export function getAvailableCourses(studentId: string): Course[] {
  const enrolledCourseIds = studentCourses
    .filter(sc => sc.studentId === studentId)
    .map(sc => sc.courseId);
  
  return courses.filter(c => !enrolledCourseIds.includes(c.id));
}
