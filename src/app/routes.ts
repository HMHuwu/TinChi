import { createBrowserRouter } from 'react-router';
import { Dashboard } from './pages/Dashboard';
import { StudentsList } from './pages/StudentsList';
import { StudentDetail } from './pages/StudentDetail';
import { EditStudent } from './pages/EditStudent';
import { Programs } from './pages/Programs';
import { Courses } from './pages/Courses';
import { Registrations } from './pages/Registrations';
import { GradeManagement } from './pages/GradeManagement';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { MyCourses } from './pages/student/MyCourses';
import { CourseRegistration } from './pages/student/CourseRegistration';
import { AcademicResult } from './pages/student/AcademicResult';
import { StudentProfile } from './pages/student/StudentProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
  },
  // Admin routes
  {
    path: '/admin/dashboard',
    Component: Dashboard,
  },
  {
    path: '/admin/students',
    Component: StudentsList,
  },
  {
    path: '/admin/students/:id',
    Component: StudentDetail,
  },
  {
    path: '/admin/students/:id/edit',
    Component: EditStudent,
  },
  {
    path: '/admin/programs',
    Component: Programs,
  },
  {
    path: '/admin/courses',
    Component: Courses,
  },
  {
    path: '/admin/registrations',
    Component: Registrations,
  },
  {
    path: '/admin/grades',
    Component: GradeManagement,
  },
  // Student routes
  {
    path: '/student/dashboard',
    Component: StudentDashboard,
  },
  {
    path: '/student/my-courses',
    Component: MyCourses,
  },
  {
    path: '/student/register',
    Component: CourseRegistration,
  },
  {
    path: '/student/results',
    Component: AcademicResult,
  },
  {
    path: '/student/profile',
    Component: StudentProfile,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);