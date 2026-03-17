import { useState } from "react";
import { StudentLayout } from "../../components/StudentLayout";
import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { getAvailableCourses } from "../../data/mockData";
import { CheckCircle } from "lucide-react";

export function CourseRegistration() {
  const studentId = "1"; // Demo student ID
  const availableCourses = getAvailableCourses(studentId);
  const [registeredCourseIds, setRegisteredCourseIds] = useState<string[]>([]);

  const handleRegister = (courseId: string) => {
    setRegisteredCourseIds([...registeredCourseIds, courseId]);
  };

  const handleUnregister = (courseId: string) => {
    setRegisteredCourseIds(registeredCourseIds.filter((id) => id !== courseId));
  };

  const columns = [
    { key: "code", label: "Mã học phần" },
    { key: "name", label: "Tên học phần" },
    { key: "credits", label: "Số tín chỉ" },
    { key: "semester", label: "Học kỳ đề xuất" },
    { key: "actions", label: "Thao tác" },
  ];

  const data = availableCourses.map((course) => ({
    code: course.code,
    name: course.name,
    credits: course.credits,
    semester: course.semester,
    actions: registeredCourseIds.includes(course.id) ? (
      <div className="flex items-center gap-2">
        <span className="text-sm text-green-600 flex items-center gap-1">
          <CheckCircle className="w-4 h-4" />
          Đã đăng ký
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleUnregister(course.id)}
        >
          Hủy
        </Button>
      </div>
    ) : (
      <Button size="sm" onClick={() => handleRegister(course.id)}>
        Đăng ký
      </Button>
    ),
  }));

  const totalCreditsRegistered = availableCourses
    .filter((c) => registeredCourseIds.includes(c.id))
    .reduce((sum, c) => sum + c.credits, 0);

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-foreground mb-2">Đăng ký học phần</h1>
          <p className="text-muted-foreground">
            Chọn các học phần bạn muốn đăng ký cho học kỳ tới
          </p>
        </div>

        {/* Registration summary */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Học phần đã chọn:{" "}
                <span className="text-primary">
                  {registeredCourseIds.length}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Tổng tín chỉ:{" "}
                <span className="text-primary">{totalCreditsRegistered}</span>
              </p>
            </div>
            {registeredCourseIds.length > 0 && (
              <Button variant="primary">
                Xác nhận đăng ký ({registeredCourseIds.length} học phần)
              </Button>
            )}
          </div>
        </div>

        {/* Info card */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="mb-2 flex items-center gap-2">
            <span className="w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs">
              !
            </span>
            Lưu ý khi đăng ký học phần
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1 ml-7">
            <li>• Số tín chỉ tối đa: 24 tín chỉ/học kỳ</li>
            <li>• Kiểm tra học phần tiên quyết trước khi đăng ký</li>
            <li>• Thời gian đăng ký: 01/04/2026 - 15/04/2026</li>
            <li>• Liên hệ phòng đào tạo nếu có thắc mắc</li>
          </ul>
        </div>

        {/* Available courses table */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-4 border-b border-border">
            <h3>Danh sách học phần có thể đăng ký</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tổng {availableCourses.length} học phần
            </p>
          </div>

          {availableCourses.length > 0 ? (
            <Table
              columns={columns}
              data={data}
              renderRow={(item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{item.code}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.credits}</td>
                  <td className="px-6 py-4">{item.semester}</td>
                  <td className="px-6 py-4">{item.action}</td>
                </tr>
              )}
            />
          ) : (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">
                Không có học phần khả dụng để đăng ký
              </p>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
