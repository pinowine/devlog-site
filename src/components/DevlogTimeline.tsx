import React, { useState } from "react";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface LogEntry {
  id: string;
  date: Date;
  title: string;
  summary: string;
  tags: string[];
  link: string;
}

export const DevlogTimeline: React.FC<{ logs: LogEntry[] }> = ({ logs }) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const groupedLogs = logs.reduce((acc, log) => {
    const year = log.date.getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(log);
    return acc;
  }, {} as Record<number, LogEntry[]>);

  return (
    <div className="relative">
      {/* 年份选择器 */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedYear(null)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors
            ${
              !selectedYear
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          全部
        </button>
        {Object.keys(groupedLogs)
          .reverse()
          .map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(Number(year))}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors
              ${
                selectedYear === Number(year)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {year}
            </button>
          ))}
      </div>

      {/* 时间轴 */}
      <div className="relative border-l-2 border-gray-200 pl-8 dark:border-gray-700">
        {Object.entries(groupedLogs)
          .filter(([year]) => !selectedYear || Number(year) === selectedYear)
          .reverse()
          .map(([year, yearLogs]) => (
            <div key={year} className="mb-8">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                {year}年
              </h3>
              {yearLogs.map((log, index) => (
                <div key={log.id} className="relative mb-6">
                  {/* 时间轴节点 */}
                  <div
                    className="absolute -left-[2.45rem] h-4 w-4 rounded-full 
                                  border-4 border-white bg-blue-600 
                                  dark:border-gray-900"
                  />

                  <div
                    className="group rounded-lg border border-gray-200 bg-white 
                                  p-4 transition-all hover:shadow-md 
                                  dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <div
                          className="mb-1 flex items-center gap-2 text-sm 
                                        text-gray-500 dark:text-gray-400"
                        >
                          <Calendar className="h-4 w-4" />
                          <time>
                            {format(log.date, "MM月dd日", { locale: zhCN })}
                          </time>
                          <Clock className="ml-2 h-4 w-4" />
                          <time>{format(log.date, "HH:mm")}</time>
                        </div>
                        <h4
                          className="text-lg font-semibold text-gray-900 
                                    dark:text-white"
                        >
                          {log.title}
                        </h4>
                      </div>
                      <ChevronRight
                        className="h-5 w-5 text-gray-400 transition-transform 
                                  group-hover:translate-x-1"
                      />
                    </div>

                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                      {log.summary}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {log.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-50 px-2 py-1 
                                    text-xs text-blue-600 
                                    dark:bg-blue-900/30 dark:text-blue-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};
