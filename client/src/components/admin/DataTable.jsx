import { Pencil, Trash2 } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import EmptyState from '../EmptyState';
import ErrorState from '../ErrorState';

const DataTable = ({
  columns,
  rows,
  status = 'success',
  errorMessage,
  onRetry,
  onEdit,
  onDelete,
  keyField = '_id',
}) => {
  if (status === 'loading') return <LoadingSpinner label="Loading…" />;
  if (status === 'error') return <ErrorState message={errorMessage} onRetry={onRetry} />;
  if (!rows.length) return <EmptyState title="Nothing here yet" />;

  return (
    <div className="overflow-x-auto rounded-2xl border border-backwater-100 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-backwater-100 bg-backwater-50/60 text-xs uppercase tracking-wide text-charcoal-800/70">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-semibold">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-3" />}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[keyField]} className="border-b border-backwater-50 last:border-0 hover:bg-backwater-50/40">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 align-middle text-charcoal-800">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(row)}
                        aria-label="Edit"
                        className="rounded p-1.5 text-backwater-700 hover:bg-backwater-50"
                      >
                        <Pencil size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(row)}
                        aria-label="Delete"
                        className="rounded p-1.5 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
