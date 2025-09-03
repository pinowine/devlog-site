import React from "react";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  type: "game" | "web";
  description: string;
  date: Date;
  tags: string[];
  thumbnail?: string;
  id: string;
  progress: number;
  status: string;
  isLink?: Boolean;
}

function statusClasses(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("progressing") || s.includes("done") || s === "完成") {
    return "bg-yellow-500/50 text-white dark:bg-yellow-500/20 dark:text-yellow-300";
  }
  if (s.includes("deprecated") || s.includes("archived") || s === "停更") {
    return "bg-gray-500/50 text-white dark:bg-gray-500/20 dark:text-gray-300";
  }
  if (s.includes("complete") || s.includes("hold") || s === "暂停") {
    return "bg-green-500/50 text-white dark:bg-green-500/20 dark:text-green-300";
  }
  // 默认“进行中”
  return "bg-blue-500/20 text-blue-300";
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  type,
  description,
  tags,
  thumbnail,
  date,
  id,
  status,
  progress,
  isLink = true,
}) => {
  const cardContent = (
    <div
      className={`glass ${
        isLink && "glass-hover"
      } rounded-xl overflow-hidden group`}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className={`w-full h-full object-cover ${
            isLink && `group-hover:scale-110 transition-transform duration-500`
          }`}
        />
        <div className="absolute top-4 left-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              type === "game"
                ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            }`}
          >
            {type === "game" ? "🎮 游戏" : "💻 前端"}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm line-clamp-2">{description}</p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center text-sm text-gray-400 space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="text-purple-400" />
            <span>{date.toISOString().slice(0, 10)}</span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses(
              status
            )}`}
          >
            {status}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">开发进度</span>
            <span className="text-gray-400 dark:text-white font-medium">
              {progress * 100}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex justify-center items-center px-3 py-1 text-xs bg-purple-500/50 dark:bg-purple-500/20 text-white dark:text-purple-300 rounded-full"
              >
                <Tag className="w-4" />
                <span key={index} className="ml-1">
                  {tag}
                </span>
              </div>
            ))}
          </div>
          {isLink && (
            <span className="inline-flex items-center gap-1 text-gray-400 dark:text-white">
              查看日志
              <ArrowRight
                className="h-4 w-4 transition-transform 
                              group-hover:translate-x-1"
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <>
      {isLink ? (
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <a href={`/projects/${id}`} className="not-content">
            {cardContent}
          </a>
        </motion.div>
      ) : (
        cardContent
      )}
    </>
  );
};
