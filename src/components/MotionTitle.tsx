import { Gamepad } from "lucide-react";
import { motion } from "framer-motion";

export default function MotionTitle() {
  return (
    <div className="flex items-center justify-between h-16">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
      >
        <Gamepad className="text-white text-xl" />
      </motion.div>
      <span className="text-2xl font-bold gradient-text ml-2">
        Drug Factory
      </span>
    </div>
  );
}
