import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Layout } from "../components/Layout";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { SelectField } from "../components/SelectField";
import { ArrowLeft, Save } from "lucide-react";

const API_URL = "http://localhost:8000";

export function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    ho_ten: "",
    email: "",
    lop: "",
    khoa: "",
    nam_hoc: 1,
    trang_thai: "Đang học",
  });

  // ================= LOAD DATA =================
  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/students/${id}`);
        const data = await res.json();

        const s = data.student;

        setFormData({
          ho_ten: s.ho_ten || "",
          email: s.email || "",
          lop: s.lop || "",
          khoa: s.khoa || "",
          nam_hoc: s.nam_hoc || 1,
          trang_thai: s.trang_thai || "Đang học",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(`${API_URL}/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      alert("Cập nhật thành công!");
      navigate(`/admin/students/${id}`);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật!");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <Link to={`/admin/students/${id}`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </Link>

          <h1 className="text-2xl mb-2">Chỉnh sửa sinh viên</h1>
          <p className="text-muted-foreground">Mã SV: {id}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-lg p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <InputField
                label="Họ và tên"
                value={formData.ho_ten}
                onChange={(v) => setFormData({ ...formData, ho_ten: v })}
                required
              />
            </div>

            <InputField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(v) => setFormData({ ...formData, email: v })}
              required
            />

            <InputField
              label="Lớp"
              value={formData.lop}
              onChange={(v) => setFormData({ ...formData, lop: v })}
            />

            <InputField
              label="Khóa"
              value={formData.khoa}
              onChange={(v) => setFormData({ ...formData, khoa: v })}
            />

            <InputField
              label="Năm học"
              type="number"
              value={formData.nam_hoc}
              onChange={(v) => setFormData({ ...formData, nam_hoc: Number(v) })}
            />

            <SelectField
              label="Trạng thái"
              value={formData.trang_thai}
              onChange={(v) => setFormData({ ...formData, trang_thai: v })}
              options={[
                { value: "Đang học", label: "Đang học" },
                { value: "Bảo lưu", label: "Bảo lưu" },
                { value: "Đã tốt nghiệp", label: "Đã tốt nghiệp" },
              ]}
            />
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <Link to={`/admin/students/${id}`}>
              <Button variant="outline" type="button">
                Hủy
              </Button>
            </Link>

            <Button variant="primary" type="submit">
              <Save className="w-4 h-4 mr-2" />
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
