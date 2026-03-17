interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'failed' | 'registered';
  children?: React.ReactNode;
}

const statusStyles = {
  active: 'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-gray-100 text-gray-700 border-gray-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  completed: 'bg-blue-100 text-blue-700 border-blue-200',
  failed: 'bg-red-100 text-red-700 border-red-200',
  registered: 'bg-purple-100 text-purple-700 border-purple-200',
};

const statusLabels = {
  active: 'Đang học',
  inactive: 'Đã nghỉ',
  pending: 'Chờ xử lý',
  completed: 'Đã hoàn thành',
  failed: 'Chưa đạt',
  registered: 'Đã đăng ký',
};

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${statusStyles[status]}`}>
      {children || statusLabels[status]}
    </span>
  );
}
