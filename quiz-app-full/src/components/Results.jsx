import { motion } from "framer-motion";

const Results = ({ score, total, questions, userAnswers, restartQuiz }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white p-6">
      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-purple-700/80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-2xl mb-6"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Results</h2>
        <p className="text-center text-lg">
          You scored{" "}
          <span className="font-bold text-yellow-300">
            {score}/{total}
          </span>{" "}
          ({((score / total) * 100).toFixed(0)}%)
        </p>
      </motion.div>

      {/* Questions Review */}
      <div className="space-y-4 w-full max-w-2xl overflow-y-auto h-[400px] pr-2">
        {questions.map((q, index) => {
          const isCorrect = userAnswers[index] === q.correct_answer;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white rounded-xl p-4 shadow-md border-l-8 
                         border-purple-500 hover:shadow-lg hover:scale-[1.01] 
                         transition-all duration-300"
            >
              <h3 className="text-sm font-semibold text-purple-700 mb-1">
                {q.category} · {q.difficulty}
              </h3>
              <p className="text-gray-900 font-medium">{q.question}</p>
              <p
                className={\`mt-2 text-sm $\{isCorrect ? "text-green-600" : "text-red-600"\}\`}
              >
                Your answer: {userAnswers[index] || "None"}
              </p>
              <p className="text-sm text-green-700">
                Correct answer: {q.correct_answer}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Restart Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={restartQuiz}
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 
                   text-white font-semibold rounded-xl shadow-lg 
                   transition-all duration-300"
      >
        🔄 Restart
      </motion.button>
    </div>
  );
};

export default Results;
