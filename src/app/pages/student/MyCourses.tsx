import { useState } from "react";
import { StudentLayout } from "../../components/StudentLayout";
import { Table } from "../../components/Table";
import { StatusBadge } from "../../components/StatusBadge";
import { getStudentCourses } from "../../data/mockData";

type TabType = "completed" | "registered" | "all";

export function MyCourses() {
  const [activeTab, setActiveTab] = useState<TabType>("registered");
  const studentId = "1"; // Demo student ID

  const allCourses = getStudentCourses(studentId);
  const completedCourses = allCourses.filter((sc) => sc.status === "completed");
  const registeredCourses = allCourses.filter(
    (sc) => sc.status === "registered",
  );

  const getDisplayCourses = () => {
    switch (activeTab) {
      case "completed":
        return completedCourses;
      case "registered":
        return registeredCourses;
      case "all":
        return allCourses;
      default:
        return allCourses;
    }
  };

  const displayCourses = getDisplayCourses();

  const columns = [
    { key: "code", label: "Mã học phần" },
    { key: "name", label: "Tên học phần" },
    { key: "credits", label: "Số tín chỉ" },
    { key: "semester", label: "Học kỳ" },
    { key: "grade", label: "Điểm" },
    { key: "status", label: "Trạng thái" },
  ];

  const data = displayCourses.map((sc) => ({
    code: sc.course.code,
    name: sc.course.name,
    credits: sc.course.credits,
    semester: sc.semester,
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
    status: (
      <StatusBadge status={sc.status === "completed" ? "active" : "inactive"} />
    ),
  }));

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-foreground mb-2">Học phần của tôi</h1>
          <p className="text-muted-foreground">
            Quản lý các học phần đã đăng ký và hoàn thành
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-card border border-border rounded-lg p-1 inline-flex">
          <button
            onClick={() => setActiveTab("registered")}
            className={`
              px-6 py-2 rounded-md transition-all
              ${
                activeTab === "registered"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }
            `}
          >
            Đang học
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`
              px-6 py-2 rounded-md transition-all
              ${
                activeTab === "completed"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }
            `}
          >
            Đã học
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`
              px-6 py-2 rounded-md transition-all
              ${
                activeTab === "all"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }
            `}
          >
            Tất cả
          </button>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Tổng học phần</p>
            <p className="text-2xl text-foreground">{allCourses.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Đã hoàn thành</p>
            <p className="text-2xl text-foreground">
              {completedCourses.length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Đang học</p>
            <p className="text-2xl text-foreground">
              {registeredCourses.length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg">
          {displayCourses.length > 0 ? (
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
              <p className="text-muted-foreground">
                {activeTab === "completed" && "Chưa có học phần đã hoàn thành"}
                {activeTab === "registered" && "Chưa có học phần đang học"}
                {activeTab === "all" && "Chưa có học phần"}
              </p>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
