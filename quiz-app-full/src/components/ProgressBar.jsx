// import React from "react"
import { motion } from "framer-motion"

export default function ProgressBar({ current, total }) {
  const pct = total ? Math.round((current / total) * 100) : 0

  return (
    <div className="w-full mr-4">
      {/* Progress Bar Container */}
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 opacity-20 blur-md"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Actual Progress */}
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      {/* Label */}
      <motion.div
        className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span>Question {current} of {total}</span>
        <span className="text-indigo-600 dark:text-indigo-400">{pct}%</span>
      </motion.div>
    </div>
  )
}
