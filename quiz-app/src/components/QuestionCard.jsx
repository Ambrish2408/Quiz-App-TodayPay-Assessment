
// import React from 'react'
import { motion } from 'framer-motion'

export default function QuestionCard({ q, selectedIndex, locked, onSelect, onKey }) {
  return (
    <fieldset
      className="grid gap-3 mt-4"
      role="radiogroup"
      aria-label="Answer choices"
    >
      {q.answers.map((ans, i) => {
        const isSelected = selectedIndex === i

        // Base styles
        let baseClasses =
          "flex items-center justify-between gap-4 p-3 rounded-xl border transition focus:ring-2 focus:ring-indigo-300 text-gray-900 dark:text-gray-100"

        // Decide colors based on state
        let stateClasses = ""
        if (locked) {
          if (isSelected && i === q.correctIndex) {
            stateClasses = " bg-green-600 text-white border-green-600"
          } else if (isSelected && i !== q.correctIndex) {
            stateClasses = " bg-red-600 text-white border-red-600"
          } else {
            stateClasses =
              " bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-80"
          }
        } else {
          if (isSelected) {
            stateClasses = " bg-indigo-600 text-white border-indigo-600"
          } else {
            stateClasses =
              " bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-700 hover:text-white"
          }
        }

        return (
          <motion.label
            key={i}
            tabIndex={0}
            onKeyDown={(e) => onKey?.(e, i)}
            whileTap={{ scale: 0.97 }}
            animate={{}}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`${baseClasses} ${stateClasses}`}
          >
            <div className="flex items-center gap-3">
              <input
                className="sr-only"
                type="radio"
                name={`answer-${q.id}`}
                checked={isSelected}
                onChange={() => onSelect(i)}
                aria-checked={isSelected}
              />
              <motion.span
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: ans }}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0.6 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            {isSelected && !locked && (
              <motion.span
                className="text-xs font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Selected
              </motion.span>
            )}
          </motion.label>
        )
      })}
    </fieldset>
  )
}
