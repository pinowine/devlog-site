import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

import type { InferEntrySchema } from "astro:content";
type LogEntryProps = {
  id: string;
  data: InferEntrySchema<"docs">;
};

const LogEntry: React.FC<LogEntryProps> = ({ id, data }) => {
  return (
    <div className="not-content">
      <a href={`/${id}`} className="block">
        <div className="glass glass-hover rounded-lg p-6 group">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse-slow" />
                <span className="text-sm text-gray-400 flex items-center space-x-1">
                  <Calendar />
                  <span>
                    {data.lastUpdated
                      ? format(data.lastUpdated, "yyyy年MM月dd日", {
                          locale: zhCN,
                        })
                      : "—"}
                  </span>
                </span>
              </div>

              <h3 className="text-xl font-semibold dark:text-white mb-2 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition">
                {data.title}
              </h3>

              {data.description && (
                <p className="text-gray-400 line-clamp-2 mb-4">
                  {data.description}
                </p>
              )}

              {data.tags && data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag: string, idx) => (
                    <div
                      key={`${tag}-${idx}`}
                      className="flex items-center justify-center px-2 py-1 text-xs bg-purple-500/40 text-white dark:bg-purple-500/20 dark:text-purple-300 rounded-md"
                    >
                      <Tag className="w-4" />
                      <span className="ml-1">{tag}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <ArrowRight className="text-gray-500 group-hover:text-purple-400 transition ml-4 mt-2" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default LogEntry;
