import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Layout } from "../components/Layout";
import { Button } from "../components/Button";
import { Table } from "../components/Table";
import { StatusBadge } from "../components/StatusBadge";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowLeft, Mail, Phone, GraduationCap, BookOpen } from "lucide-react";

const API_URL = "http://localhost:8000";

export function StudentDetail() {
  const { id } = useParams();

  const [student, setStudent] = useState<any>(null);
  const [completedCourses, setCompletedCourses] = useState<any[]>([]);
  const [registeredCourses, setRegisteredCourses] = useState<any[]>([]);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/students/${id}`);
        const data = await res.json();

        // ✅ map student
        const s = data.student;
        const mappedStudent = {
          id: s.ma_sv,
          code: s.ma_sv,
          name: s.ho_ten,
          email: s.email,
          program: s.lop,
          major: s.nganh || "CNTT",
          status: "Đang học",
        };

        // ✅ map grades -> completedCourses
        const completed = (data.grades || []).map((g: any, index: number) => ({
          id: index,
          code: g.ma_hp,
          name: g.ten_hp,
          semester: "-", // chưa có trong BE
          grade: g.diem_chu + ` (${g.diem_tk})`,
        }));

        setStudent(mappedStudent);
        setCompletedCourses(completed);

        // backend chưa có → để rỗng
        setRegisteredCourses([]);
        setAvailableCourses([]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleRegister = async (courseId: string) => {
    try {
      await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: id,
          courseId,
        }),
      });

      alert("Đăng ký thành công");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">Loading...</div>
      </Layout>
    );
  }

  if (!student) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-xl text-foreground mb-2">
            Không tìm thấy sinh viên
          </h2>
          <Link to="/admin/students">
            <Button variant="primary">Quay lại danh sách</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <Link to="/admin/students">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Button>
        </Link>

        {/* info card */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <span className="text-2xl text-primary-foreground">
                  {student.name?.split(" ").pop()?.charAt(0)}
                </span>
              </div>

              <div>
                <h1 className="text-2xl text-foreground mb-1">
                  {student.name}
                </h1>

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
                  <p className="text-xs text-muted-foreground">
                    Chương trình đào tạo
                  </p>
                  <p className="text-sm text-foreground">{student.program}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tabs */}
        <Tabs.Root
          defaultValue="completed"
          className="bg-card border border-border rounded-lg"
        >
          <Tabs.List className="flex border-b border-border">
            <Tabs.Trigger value="completed" className="px-6 py-3 text-sm">
              Học phần đã học ({completedCourses.length})
            </Tabs.Trigger>

            <Tabs.Trigger value="registered" className="px-6 py-3 text-sm">
              Học phần đã đăng ký ({registeredCourses.length})
            </Tabs.Trigger>

            <Tabs.Trigger value="available" className="px-6 py-3 text-sm">
              Học phần chưa học ({availableCourses.length})
            </Tabs.Trigger>
          </Tabs.List>

          {/* completed */}
          <Tabs.Content value="completed" className="p-6">
            <Table
              columns={[
                { key: "code", label: "Mã học phần" },
                { key: "name", label: "Tên học phần" },
                { key: "semester", label: "Học kỳ" },
                { key: "grade", label: "Điểm" },
              ]}
              data={completedCourses}
              renderRow={(sc: any) => (
                <tr key={sc.id}>
                  <td className="px-6 py-4">{sc.code}</td>
                  <td className="px-6 py-4">{sc.name}</td>
                  <td className="px-6 py-4">{sc.semester}</td>
                  <td className="px-6 py-4">{sc.grade}</td>
                </tr>
              )}
            />
          </Tabs.Content>

          {/* registered */}
          <Tabs.Content value="registered" className="p-6">
            <Table
              columns={[
                { key: "code", label: "Mã học phần" },
                { key: "name", label: "Tên học phần" },
                { key: "semester", label: "Học kỳ" },
              ]}
              data={registeredCourses}
              renderRow={(sc: any) => (
                <tr key={sc.id}>
                  <td className="px-6 py-4">{sc.code}</td>
                  <td className="px-6 py-4">{sc.name}</td>
                  <td className="px-6 py-4">{sc.semester}</td>
                </tr>
              )}
            />
          </Tabs.Content>

          {/* available */}
          <Tabs.Content value="available" className="p-6">
            <Table
              columns={[
                { key: "code", label: "Mã học phần" },
                { key: "name", label: "Tên học phần" },
                { key: "credits", label: "Tín chỉ" },
                { key: "actions", label: "Thao tác" },
              ]}
              data={availableCourses}
              renderRow={(course: any) => (
                <tr key={course.id}>
                  <td className="px-6 py-4">{course.code}</td>
                  <td className="px-6 py-4">{course.name}</td>
                  <td className="px-6 py-4">{course.credits}</td>
                  <td className="px-6 py-4">
                    <Button size="sm" onClick={() => handleRegister(course.id)}>
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
