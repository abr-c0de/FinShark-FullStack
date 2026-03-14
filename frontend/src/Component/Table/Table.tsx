import { useMemo } from "react";

type TableColumn<T> = {
  label: string;
  render: (row: T) => React.ReactNode;
};

interface TableProps<T> {
  config: TableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string | number;
}

const Table = <T,>({ config, data, getRowKey }: TableProps<T>) => {

  const renderedRows = useMemo(
    () =>
      data.map((row) => (
        <tr key={getRowKey(row)}>
          {config.map((col, index) => (
            <td
              key={index}
              className="p-4 whitespace-nowrap text-sm font-normal text-gray-900"
            >
              {col.render(row)}
            </td>
          ))}
        </tr>
      )),
    [data, config, getRowKey]
  );

const renderedHeader = useMemo(
  () =>
    config.map((col) => (
      <th
        key={col.label}
        className="p-4 text-left text-xs font-medium text-gray-900 tracking-wider"
      >
        {col.label}
      </th>
    )),
  [config]
);

  return (
    <div className="flex-1 h-full w-full bg-white shadow rounded-lg overflow-auto">
      <table className="min-w-full h-full border-collapse">
        <thead className="sticky top-0 bg-white z-10 divide-y divide-gray-200">
          <tr>{renderedHeader}</tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {renderedRows}
        </tbody>
      </table>
    </div>
  );
};

export default Table;


 