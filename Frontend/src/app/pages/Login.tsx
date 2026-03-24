import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap } from "lucide-react";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";

const API_URL = "http://localhost:8000";

export function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    role: "student" as "student" | "admin",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.identifier,
          password: formData.password,
          role: formData.role,
        }),
      });

      // ❗ check status trước
      if (!res.ok) {
        alert("Sai tài khoản hoặc mật khẩu");
        return;
      }

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      // ❗ đảm bảo có role
      if (!data.role) {
        alert("Lỗi server: thiếu role");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      // ❗ điều hướng chuẩn
      if (data.role === "student") {
        navigate("/student/dashboard");
      } else if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        alert("Role không hợp lệ");
      }
    } catch (error) {
      console.error(error);
      alert("Không kết nối được server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="p-8 border rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-2xl text-center">Hệ thống quản lý học phần</h1>

            <p className="text-sm mt-2 text-gray-500">Đăng nhập để tiếp tục</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Mã sinh viên / Admin"
              value={formData.identifier}
              onChange={(v) => setFormData({ ...formData, identifier: v })}
              placeholder="VD: SV001 hoặc admin"
              required
            />

            <InputField
              label="Mật khẩu"
              type="password"
              value={formData.password}
              onChange={(v) => setFormData({ ...formData, password: v })}
              placeholder="Nhập mật khẩu"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "student" })}
                className={
                  formData.role === "student"
                    ? "border-2 border-blue-500 p-3 rounded"
                    : "border p-3 rounded"
                }
              >
                Sinh viên
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "admin" })}
                className={
                  formData.role === "admin"
                    ? "border-2 border-blue-500 p-3 rounded"
                    : "border p-3 rounded"
                }
              >
                Admin
              </button>
            </div>

            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>SV: SV001 / 1</p>
            <p>Admin: admin / 1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
