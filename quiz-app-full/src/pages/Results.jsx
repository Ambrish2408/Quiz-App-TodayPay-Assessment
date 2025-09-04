// import React, { useEffect, useMemo } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'

// const HS_KEY = 'quiz.highscores'
// function getHighScores(){ try { return JSON.parse(localStorage.getItem(HS_KEY) || '[]') } catch { return [] } }
// function saveIfTop(prev, entry){ try{ const next = [entry, ...prev].slice(0,10); localStorage.setItem(HS_KEY, JSON.stringify(next)) }catch{} }

// export default function Results(){
//   const { state } = useLocation()
//   const nav = useNavigate()
//   if (!state) return <div className='max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow'>No results</div>
//   const { questions, selections, difficulty } = state

//   const score = useMemo(()=>{
//     let s=0
//     for (const q of questions){ const sel = selections[q.id]; if (sel !== undefined && sel !== -1 && q.answers[sel] === q.answers[q.correctIndex]) s++ }
//     return s
//   }, [questions, selections])

//   useEffect(()=>{
//     try{
//       const prev = getHighScores()
//       const entry = { id: Date.now(), score, total: questions.length, pct: Math.round((score/questions.length)*100), ts: Date.now(), difficulty }
//       saveIfTop(prev, entry)
//     }catch(e){}
//   }, [])

//   return (
//     <motion.div className='max-w-3xl mx-auto p-6 bg-pink dark:bg-purple-800 rounded-2xl shadow'>
//       <h2 className='text-2xl font-bold'>Results</h2>
//       <p className='text-blue-600 mt-2'>You scored <strong>{score}/{questions.length}</strong> ({questions.length ? Math.round((score/questions.length)*100) : 0}%) · {difficulty}</p>

//       <div className='mt-6 space-y-3 max-h-[60vh] overflow-auto'>
//         {questions.map((q, i)=>{
//           const sel = selections[q.id]
//           const correct = q.correctIndex
//           const ok = sel !== undefined && sel !== -1 && q.answers[sel] === q.answers[correct]
//           return (
//             <div key={q.id} className={`p-3 rounded-md border ${ok ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
//               <div className='text-sm text-white-500'>{q.category} · {q.difficulty}</div>
//               <div className='font-medium mt-1' dangerouslySetInnerHTML={{ __html: q.question }} />
//               <div className='mt-2 text-sm'>
//                 <div>Your answer: {sel === undefined || sel === -1 ? <em>None</em> : <span dangerouslySetInnerHTML={{ __html: q.answers[sel] }} />}</div>
//                 {!ok && <div>Correct answer: <span dangerouslySetInnerHTML={{ __html: q.answers[correct] }} /></div>}
//               </div>
//             </div>
//           )
//         })}
//       </div>

//       <div className='mt-6 flex gap-3 justify-end'>
//         <button onClick={()=>nav('/')} className='px-4 py-2 rounded bg-gray-200 dark:bg-blue-700'>Restart</button>
//       </div>
//     </motion.div>
//   )
// }
import React, { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HS_KEY = 'quiz.highscores'
function getHighScores() {
  try {
    return JSON.parse(localStorage.getItem(HS_KEY) || '[]')
  } catch {
    return []
  }
}
function saveIfTop(prev, entry) {
  try {
    const next = [entry, ...prev].slice(0, 10)
    localStorage.setItem(HS_KEY, JSON.stringify(next))
  } catch {}
}

export default function Results() {
  const { state } = useLocation()
  const nav = useNavigate()

  if (!state) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-pink-900 text-red-100 rounded-2xl shadow-lg">
        No results
      </div>
    )
  }

  const { questions, selections, difficulty } = state

  const score = useMemo(() => {
    let s = 0
    for (const q of questions) {
      const sel = selections[q.id]
      if (
        sel !== undefined &&
        sel !== -1 &&
        q.answers[sel] === q.answers[q.correctIndex]
      )
        s++
    }
    return s
  }, [questions, selections])

  useEffect(() => {
    try {
      const prev = getHighScores()
      const entry = {
        id: Date.now(),
        score,
        total: questions.length,
        pct: Math.round((score / questions.length) * 100),
        ts: Date.now(),
        difficulty,
      }
      saveIfTop(prev, entry)
    } catch (e) {}
  }, [])

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-indigo-400">Results</h2>
      <p className="mt-2 text-gray-300">
        You scored{' '}
        <strong className="text-indigo-400">
          {score}/{questions.length}
        </strong>{' '}
        ({questions.length ? Math.round((score / questions.length) * 100) : 0}
        %) · <span className="capitalize">{difficulty}</span>
      </p>

      <div className="mt-6 space-y-3 max-h-[60vh] overflow-auto">
        {questions.map((q) => {
          const sel = selections[q.id]
          const correct = q.correctIndex
          const ok =
            sel !== undefined &&
            sel !== -1 &&
            q.answers[sel] === q.answers[correct]

          return (
            <div
              key={q.id}
              className={`p-4 rounded-lg border shadow ${
                ok
                  ? 'bg-green-800/30 border-green-500'
                  : 'bg-red-800/30 border-red-500'
              }`}
            >
              <div className="text-xs text-gray-400">
                {q.category} · {q.difficulty}
              </div>
              <div
                className="font-medium mt-1 text-gray-100"
                dangerouslySetInnerHTML={{ __html: q.question }}
              />
              <div className="mt-2 text-sm text-gray-300">
                <div>
                  Your answer:{' '}
                  {sel === undefined || sel === -1 ? (
                    <em className="text-gray-400">None</em>
                  ) : (
                    <span
                      className="text-yellow-400"
                      dangerouslySetInnerHTML={{ __html: q.answers[sel] }}
                    />
                  )}
                </div>
                {!ok && (
                  <div>
                    Correct answer:{' '}
                    <span
                      className="text-green-400"
                      dangerouslySetInnerHTML={{ __html: q.answers[correct] }}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex gap-3 justify-end">
        <button
          onClick={() => nav('/')}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-red shadow-md"
        >
          Restart
        </button>
      </div>
    </motion.div>
  )
}
