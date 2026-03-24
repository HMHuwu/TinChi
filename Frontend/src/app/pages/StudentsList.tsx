import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Layout } from "../components/Layout";
import { SearchBar } from "../components/SearchBar";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { StatusBadge } from "../components/StatusBadge";
import { Eye, Edit } from "lucide-react";

export function StudentsList() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // fetch students từ backend
  useEffect(() => {
    fetch("http://localhost:8000/students")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((s: any) => ({
          id: s.ma_sv,
          code: s.ma_so,
          name: s.ho_ten,
          major: s.nganh,
          program: s.lop,
          status: s.trang_thai,
        }));

        setStudents(mapped);
      })
      .catch((err) => console.error(err));
  }, []);

  // filter search
  const filteredStudents = students.filter(
    (student) =>
      student.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.program?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.major?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns = [
    { key: "code", label: "Mã sinh viên" },
    { key: "name", label: "Họ tên" },
    { key: "major", label: "Ngành" },
    { key: "program", label: "Chương trình" },
    // { key: "status", label: "Trạng thái" },
    { key: "actions", label: "Thao tác" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-foreground mb-2">Quản lý sinh viên</h1>
            <p className="text-muted-foreground">
              Danh sách toàn bộ sinh viên trong hệ thống
            </p>
          </div>

          <Button variant="primary">Thêm sinh viên mới</Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <SearchBar
              placeholder="Tìm kiếm sinh viên theo mã, tên, hoặc chương trình..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          <Table
            columns={columns}
            data={filteredStudents}
            renderRow={(student) => (
              <tr
                key={student.id}
                className="hover:bg-secondary/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-primary">
                  {student.code}
                </td>

                <td className="px-6 py-4 text-sm text-foreground">
                  {student.name}
                </td>

                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {student.major}
                </td>

                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {student.program}
                </td>

                {/* <td className="px-6 py-4">
                  <StatusBadge status={student.status} />
                </td> */}

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/students/${student.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1.5" />
                        Xem
                      </Button>
                    </Link>

                    <Link to={`/admin/students/${student.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4 mr-1.5" />
                        Sửa
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          />

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <p>
              Hiển thị {filteredStudents.length} trong tổng số {students.length}{" "}
              sinh viên
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
