import { Layout } from '../components/Layout';
import { GraduationCap } from 'lucide-react';

export function Programs() {
  const programs = [
    { 
      id: '1', 
      name: 'Chuẩn', 
      description: 'Chương trình đào tạo chuẩn theo quy định của Bộ Giáo dục',
      students: 3
    },
    { 
      id: '2', 
      name: 'Chất lượng cao', 
      description: 'Chương trình đào tạo chất lượng cao với giảng viên quốc tế',
      students: 2
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-foreground mb-2">Chương trình đào tạo</h1>
          <p className="text-muted-foreground">Quản lý các chương trình đào tạo của trường</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-foreground mb-2">{program.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary">{program.students} sinh viên</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
