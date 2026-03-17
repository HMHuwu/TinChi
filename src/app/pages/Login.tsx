import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap } from "lucide-react";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    role: "student" as "student" | "admin",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl text-foreground text-center">
              Hệ thống quản lý học phần
            </h1>
            <p className="text-muted-foreground text-center mt-2">
              Đăng nhập để tiếp tục
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email / Mã sinh viên"
              type="text"
              value={formData.identifier}
              onChange={(value) =>
                setFormData({ ...formData, identifier: value })
              }
              placeholder="Nhập email hoặc mã sinh viên"
              required
            />

            <InputField
              label="Mật khẩu"
              type="password"
              value={formData.password}
              onChange={(value) =>
                setFormData({ ...formData, password: value })
              }
              placeholder="Nhập mật khẩu"
              required
            />

            <div>
              <label className="block mb-2 text-foreground">Vai trò</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "student" })}
                  className={`
                    py-3 px-4 rounded-lg border-2 transition-all
                    ${
                      formData.role === "student"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }
                  `}
                >
                  Sinh viên
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "admin" })}
                  className={`
                    py-3 px-4 rounded-lg border-2 transition-all
                    ${
                      formData.role === "admin"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }
                  `}
                >
                  Quản trị viên
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo: Bất kỳ email/mã sinh viên và mật khẩu nào</p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          © 2026 Hệ thống quản lý học phần
        </div>
      </div>
    </div>
  );
}
