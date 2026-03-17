import { ReactNode } from 'react';

interface Column {
  key: string;
  label: string;
  className?: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  renderRow: (item: any, index: number) => ReactNode;
}

export function Table({ columns, data, renderRow }: TableProps) {
  return (
    <div className="overflow-x-auto bg-card border border-border rounded-lg">
      <table className="w-full">
        <thead className="bg-secondary border-b border-border">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground ${column.className || ''}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-muted-foreground">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            data.map((item, index) => renderRow(item, index))
          )}
        </tbody>
      </table>
    </div>
  );
}
