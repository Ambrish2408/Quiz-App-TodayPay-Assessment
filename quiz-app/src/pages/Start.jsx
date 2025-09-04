
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const HS_KEY = "quiz.highscores"
function getHighScores() {
  try {
    return JSON.parse(localStorage.getItem(HS_KEY) || "[]")
  } catch {
    return []
  }
}

export default function Start() {
  const nav = useNavigate()
  const [difficulty, setDifficulty] = useState("easy")
  const [amount, setAmount] = useState(5)
  const [highs, setHighs] = useState([])

  useEffect(() => {
    setHighs(getHighScores())
  }, [])

  function start() {
    nav(`/quiz?difficulty=${difficulty}&amount=${amount}`)
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Title */}
      <motion.h1
        className="text-3xl font-extrabold flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        ⚡ Quiz App
      </motion.h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Pick settings and press Start.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* Left Side (Settings) */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Questions</label>
            <select
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value={5}>5</option>
              <option value={7}>7</option>
              <option value={10}>10</option>
            </select>
          </div>

          <motion.button
            onClick={start}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-4 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 transition"
          >
            🚀 Start Quiz
          </motion.button>
        </div>

        {/* Right Side (High Scores) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold text-lg mb-3">🏆 High Scores</h3>
          {highs.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No stored high scores yet.
            </p>
          ) : (
            <ul className="mt-2 space-y-3">
              {highs.map((h) => (
                <motion.li
                  key={h.id}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex justify-between items-center hover:shadow-md transition"
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <div className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {h.pct}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {h.score}/{h.total} · {h.difficulty}
                    </div>
                  </div>
                  <time className="text-xs text-gray-400">
                    {new Date(h.ts).toLocaleDateString()}
                  </time>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
