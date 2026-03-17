import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { SelectField } from '../components/SelectField';
import { ArrowLeft, Save } from 'lucide-react';
import { getStudentById } from '../data/mockData';

export function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = getStudentById(id!);

  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    phone: student?.phone || '',
    major: student?.major || '',
    program: student?.program || '',
  });

  if (!student) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-xl text-foreground mb-2">Không tìm thấy sinh viên</h2>
          <Link to="/admin/students">
            <Button variant="primary">Quay lại danh sách</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cập nhật thông tin sinh viên thành công!');
    navigate(`/admin/students/${id}`);
  };

  const majorOptions = [
    { value: 'Công nghệ thông tin', label: 'Công nghệ thông tin' },
    { value: 'Khoa học máy tính', label: 'Khoa học máy tính' },
    { value: 'An toàn thông tin', label: 'An toàn thông tin' },
    { value: 'Hệ thống thông tin', label: 'Hệ thống thông tin' },
  ];

  const programOptions = [
    { value: 'Chuẩn', label: 'Chuẩn' },
    { value: 'Chất lượng cao', label: 'Chất lượng cao' },
    { value: 'Liên kết quốc tế', label: 'Liên kết quốc tế' },
  ];

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
          <h1 className="text-2xl text-foreground mb-2">Chỉnh sửa thông tin sinh viên</h1>
          <p className="text-muted-foreground">Cập nhật thông tin cho sinh viên {student.code}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <InputField
                label="Họ và tên"
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            <InputField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              placeholder="example@university.edu.vn"
              required
            />

            <InputField
              label="Số điện thoại"
              type="tel"
              value={formData.phone}
              onChange={(value) => setFormData({ ...formData, phone: value })}
              placeholder="0123456789"
              required
            />

            <SelectField
              label="Ngành"
              value={formData.major}
              onChange={(value) => setFormData({ ...formData, major: value })}
              options={majorOptions}
              required
            />

            <SelectField
              label="Chương trình đào tạo"
              value={formData.program}
              onChange={(value) => setFormData({ ...formData, program: value })}
              options={programOptions}
              required
            />
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
            <Link to={`/admin/students/${id}`}>
              <Button variant="outline" type="button">
                Hủy
              </Button>
            </Link>
            <Button variant="primary" type="submit">
              <Save className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}