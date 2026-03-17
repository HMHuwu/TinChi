import { Link } from 'react-router';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-6xl mb-4">404</h1>
        <h2 className="text-2xl text-foreground mb-2">Không tìm thấy trang</h2>
        <p className="text-muted-foreground mb-8">Trang bạn đang tìm kiếm không tồn tại.</p>
        <Link to="/">
          <Button variant="primary">
            <Home className="w-4 h-4 mr-2" />
            Về trang chủ
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
