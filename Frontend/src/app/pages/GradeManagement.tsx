import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { SearchBar } from "../components/SearchBar";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { StatusBadge } from "../components/StatusBadge";
import { Save } from "lucide-react";

const API_URL = "http://localhost:8000";

export function GradeManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [editingGrades, setEditingGrades] = useState<Map<string, number>>(
    new Map(),
  );

  // ===== LOAD DATA =====
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/grades`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===== SEARCH =====
  const filteredData = data.filter(
    (item) =>
      item.course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.student.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ===== EDIT =====
  const handleGradeChange = (
    studentId: string,
    courseId: string,
    value: string,
  ) => {
    const key = `${studentId}-${courseId}`;
    const numValue = parseFloat(value);

    if (value === "" || isNaN(numValue)) {
      setEditingGrades((prev) => {
        const newMap = new Map(prev);
        newMap.delete(key);
        return newMap;
      });
    } else {
      setEditingGrades((prev) => new Map(prev).set(key, numValue));
    }
  };

  // ===== SAVE =====
  const handleSave = async (studentId: string, courseId: string) => {
    const key = `${studentId}-${courseId}`;
    const newGrade = editingGrades.get(key);

    if (newGrade === undefined) return;

    try {
      const res = await fetch(`${API_URL}/grades`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ma_sv: studentId,
          ma_hp: courseId,
          diem_tk: newGrade,
        }),
      });

      if (!res.ok) {
        alert("Lỗi khi lưu điểm");
        return;
      }

      alert("Lưu thành công");

      // reload lại data
      await fetchData();

      // clear editing
      setEditingGrades((prev) => {
        const newMap = new Map(prev);
        newMap.delete(key);
        return newMap;
      });
    } catch (err) {
      console.error(err);
      alert("Không kết nối server");
    }
  };

  const columns = [
    { key: "courseCode", label: "Mã học phần" },
    { key: "courseName", label: "Tên học phần" },
    { key: "student", label: "Sinh viên" },
    { key: "grade", label: "Điểm" },
    { key: "status", label: "Trạng thái" },
    { key: "actions", label: "Thao tác" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl mb-2">Quản lý điểm</h1>
          <p className="text-sm text-gray-500">Nhập điểm từ 0 → 10</p>
        </div>

        <div className="border rounded-lg p-6">
          <div className="mb-6">
            <SearchBar
              placeholder="Tìm theo học phần, sinh viên..."
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
              const displayGrade = editingGrade ?? item.grade;
              const isEditing = editingGrades.has(key);

              return (
                <tr key={key} className="hover:bg-gray-50">
                  {/* Mã HP */}
                  <td className="px-4 py-2 text-blue-600">
                    {item.course.code}
                  </td>

                  {/* Tên HP */}
                  <td className="px-4 py-2">{item.course.name}</td>

                  {/* Sinh viên */}
                  <td className="px-4 py-2">
                    <div>
                      <p>{item.student.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.student.code}
                      </p>
                    </div>
                  </td>

                  {/* Điểm */}
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={displayGrade ?? ""}
                      onChange={(e) =>
                        handleGradeChange(
                          item.studentId,
                          item.courseId,
                          e.target.value,
                        )
                      }
                      className={`
                        w-20 px-2 py-1 border rounded
                        ${displayGrade >= 5 ? "text-green-600" : "text-red-600"}
                        ${isEditing ? "border-blue-500 bg-blue-50" : ""}
                      `}
                    />
                  </td>

                  {/* Trạng thái */}
                  <td className="px-4 py-2">
                    <StatusBadge
                      status={displayGrade >= 5 ? "completed" : "failed"}
                    />
                  </td>

                  {/* Action */}
                  <td className="px-4 py-2">
                    <Button
                      size="sm"
                      onClick={() => handleSave(item.studentId, item.courseId)}
                      disabled={!isEditing}
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Lưu
                    </Button>
                  </td>
                </tr>
              );
            }}
          />

          <div className="mt-4 text-sm text-gray-500">
            Hiển thị {filteredData.length} bản ghi
          </div>
        </div>
      </div>
    </Layout>
  );
}
