import { StudentLayout } from '../../components/StudentLayout';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { User, Mail, Phone, GraduationCap, BookOpen } from 'lucide-react';
import { getStudentById } from '../../data/mockData';

export function StudentProfile() {
  const studentId = '1'; // Demo student ID
  const student = getStudentById(studentId);

  if (!student) {
    return (
      <StudentLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Không tìm thấy thông tin sinh viên</p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-foreground mb-2">Thông tin cá nhân</h1>
          <p className="text-muted-foreground">Xem và cập nhật thông tin của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-lg mb-1">{student.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{student.code}</p>
                <div className="mt-4 w-full">
                  <div className={`
                    inline-flex px-3 py-1 rounded-full text-sm
                    ${student.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                    }
                  `}>
                    {student.status === 'active' ? 'Đang học' : 'Tạm nghỉ'}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{student.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{student.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{student.major}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{student.program}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Information form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg mb-6">Thông tin chi tiết</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Mã sinh viên"
                    value={student.code}
                    disabled
                  />
                  <InputField
                    label="Trạng thái"
                    value={student.status === 'active' ? 'Đang học' : 'Tạm nghỉ'}
                    disabled
                  />
                </div>

                <InputField
                  label="Họ và tên"
                  value={student.name}
                  disabled
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Email"
                    type="email"
                    value={student.email}
                    disabled
                  />
                  <InputField
                    label="Số điện thoại"
                    value={student.phone}
                    disabled
                  />
                </div>

                <InputField
                  label="Ngành học"
                  value={student.major}
                  disabled
                />

                <InputField
                  label="Chương trình đào tạo"
                  value={student.program}
                  disabled
                />

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Để cập nhật thông tin cá nhân, vui lòng liên hệ phòng đào tạo hoặc gửi yêu cầu qua hệ thống.
                  </p>
                  <Button variant="outline">
                    Gửi yêu cầu cập nhật thông tin
                  </Button>
                </div>
              </div>
            </div>

            {/* Additional info */}
            <div className="bg-card border border-border rounded-lg p-6 mt-6">
              <h3 className="text-lg mb-4">Thông tin học vụ</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Năm nhập học</p>
                  <p className="text-lg">2023</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Niên khóa</p>
                  <p className="text-lg">2023-2027</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Khóa học</p>
                  <p className="text-lg">K18</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
