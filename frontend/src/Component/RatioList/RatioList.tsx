import { useMemo } from "react";

export type RatioConfig<T> = {
  label: string;
  subTitle?: string;
  render: (data: T) => React.ReactNode;
};

interface RatioListProps<T> {
  data: T;
  config: RatioConfig<T>[];
}

const RatioList = <T,>({ data, config }: RatioListProps<T>) => {
  const renderedRows = useMemo(
    () =>
      config.map((row) => (
        <li className="py-3 sm:py-4" key={row.label}>
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {row.label}
              </p>

              {row.subTitle && (
                <p className="text-sm text-gray-500 truncate">
                  {row.subTitle}
                </p>
              )}
            </div>

            <div className="ml-6 text-base font-semibold text-gray-900">
              {row.render(data)}
            </div>
          </div>
        </li>
      )),
    [config, data]
  );

  return (
    <div className="bg-white shadow rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 h-full">
      <ul className="divide-y divide-gray-200">{renderedRows}</ul>
    </div>
  );
};

export default RatioList;
 