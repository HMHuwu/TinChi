import { StudentLayout } from "../../components/StudentLayout";
import { Table } from "../../components/Table";
import { StatusBadge } from "../../components/StatusBadge";
import { getStudentCourses } from "../../data/mockData";

export function AcademicResult() {
  const studentId = "1"; // Demo student ID
  const studentCourses = getStudentCourses(studentId);
  const completedCourses = studentCourses.filter(
    (sc) => sc.status === "completed",
  );

  // Calculate GPA
  const totalGradePoints = completedCourses.reduce((sum, sc) => {
    return sum + (sc.grade || 0) * sc.course.credits;
  }, 0);
  const totalCredits = completedCourses.reduce(
    (sum, sc) => sum + sc.course.credits,
    0,
  );
  const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;

  const columns = [
    { key: "code", label: "Mã học phần" },
    { key: "name", label: "Tên học phần" },
    { key: "credits", label: "Số tín chỉ" },
    { key: "grade", label: "Điểm" },
    { key: "status", label: "Trạng thái" },
  ];

  const data = completedCourses.map((sc) => ({
    code: sc.course.code,
    name: sc.course.name,
    credits: sc.course.credits,
    grade: sc.grade ? (
      <span
        className={`${
          sc.grade >= 8
            ? "text-green-600"
            : sc.grade >= 5
              ? "text-foreground"
              : "text-destructive"
        }`}
      >
        {sc.grade.toFixed(1)}
      </span>
    ) : (
      "-"
    ),
    status: <StatusBadge status="active" />,
  }));

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-foreground mb-2">Kết quả học tập</h1>
          <p className="text-muted-foreground">Bảng điểm tổng hợp của bạn</p>
        </div>

        {/* GPA Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-lg p-6">
            <p className="text-sm opacity-90 mb-2">Điểm trung bình (GPA)</p>
            <p className="text-4xl">{gpa.toFixed(2)}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">
              Tổng tín chỉ tích lũy
            </p>
            <p className="text-3xl text-foreground">{totalCredits}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">
              Học phần đã hoàn thành
            </p>
            <p className="text-3xl text-foreground">
              {completedCourses.length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">
              Xếp loại học lực
            </p>
            <p className="text-xl text-foreground">
              {gpa >= 8.5
                ? "Xuất sắc"
                : gpa >= 7.0
                  ? "Giỏi"
                  : gpa >= 5.5
                    ? "Khá"
                    : gpa >= 4.0
                      ? "Trung bình"
                      : "Yếu"}
            </p>
          </div>
        </div>

        {/* Progress chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg mb-4">Tiến độ học tập</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Tín chỉ tích lũy</span>
                <span className="text-sm text-muted-foreground">
                  {totalCredits} / 120
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-accent rounded-full h-3 transition-all"
                  style={{ width: `${(totalCredits / 120) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-2xl text-green-600">
                  {
                    completedCourses.filter((sc) => sc.grade && sc.grade >= 8)
                      .length
                  }
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Điểm A (≥ 8.0)
                </p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-2xl text-foreground">
                  {
                    completedCourses.filter(
                      (sc) => sc.grade && sc.grade >= 7 && sc.grade < 8,
                    ).length
                  }
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Điểm B (7.0-7.9)
                </p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-2xl text-foreground">
                  {
                    completedCourses.filter(
                      (sc) => sc.grade && sc.grade >= 5 && sc.grade < 7,
                    ).length
                  }
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Điểm C (5.0-6.9)
                </p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-2xl text-destructive">
                  {
                    completedCourses.filter((sc) => sc.grade && sc.grade < 5)
                      .length
                  }
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Điểm D ({"<"} 5.0)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transcript table */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-4 border-b border-border">
            <h3>Bảng điểm chi tiết</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Danh sách các học phần đã hoàn thành
            </p>
          </div>

          {completedCourses.length > 0 ? (
            <Table
              columns={columns}
              data={data}
              renderRow={(item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{item.code}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.credits}</td>
                  <td className="px-6 py-4">{item.grade}</td>
                  <td className="px-6 py-4">{item.status}</td>
                </tr>
              )}
            />
          ) : (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">Chưa có kết quả học tập</p>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
