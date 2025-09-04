// import React, { useEffect, useMemo, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import ProgressBar from '../components/ProgressBar'
// import QuestionCard from '../components/QuestionCard'
// import { normalizeOpenTDB } from '../utils'
// import { motion } from 'framer-motion'

// const HS_KEY = 'quiz.highscores'
// function saveHighScore(entry){
//   try{
//     const prev = JSON.parse(localStorage.getItem(HS_KEY) || '[]')
//     const next = [entry, ...prev].slice(0,10)
//     localStorage.setItem(HS_KEY, JSON.stringify(next))
//   }catch{}
// }

// export default function Quiz(){
//   const nav = useNavigate()
//   const params = new URLSearchParams(location.search)
//   const difficulty = params.get('difficulty') || 'easy'
//   const amount = Number(params.get('amount') || 5)

//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [questions, setQuestions] = useState([])

//   const [idx, setIdx] = useState(0)
//   const [selections, setSelections] = useState({}) // { [id]: index }
//   const [locked, setLocked] = useState(false)
//   const [timeLeft, setTimeLeft] = useState(30)
//   const timerRef = useRef(null)
//   const [busy, setBusy] = useState(false)

//   useEffect(()=>{
//     let active = true
//     async function load(){
//       setLoading(true); setError('')
//       try{
//         const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
//         const controller = new AbortController()
//         const id = setTimeout(()=> controller.abort(), 8000) // 8s timeout
//         const res = await fetch(url, { cache: 'no-store', signal: controller.signal })
//         clearTimeout(id)
//         if (!res.ok) throw new Error('Network error')
//         const data = await res.json()
//         let qs = Array.isArray(data?.results) && data.results.length ? normalizeOpenTDB(data.results) : []
//         if (!qs.length){
//           const local = await fetch('/questions.json').then(r=>r.json())
//           qs = normalizeOpenTDB(local.slice(0, amount))
//         }
//         if (!active) return
//         setQuestions(qs)
//         setIdx(0); setSelections({}); setLocked(false); setTimeLeft(30)
//       }catch(e){
//         console.error(e)
//         try{
//           const local = await fetch('/questions.json').then(r=>r.json())
//           const qs = normalizeOpenTDB(local.slice(0, amount))
//           if (!active) return
//           setQuestions(qs); setError('Using local fallback questions.')
//         }catch(e2){
//           setError('Failed to load questions. Check connection.')
//         }
//       }finally{ if (active) setLoading(false) }
//     }
//     load()
//     return ()=>{ active=false; clearInterval(timerRef.current) }
//   }, [difficulty, amount])

//   // timer per question with auto-lock
//   useEffect(()=>{
//     clearInterval(timerRef.current)
//     setTimeLeft(30)
//     timerRef.current = setInterval(()=>{
//       setTimeLeft(t=>{
//         if (t <= 1){
//           clearInterval(timerRef.current)
//           handleLock(true)
//           return 0
//         }
//         return t-1
//       })
//     }, 1000)
//     return ()=> clearInterval(timerRef.current)
//   }, [idx, questions])

//   const q = questions[idx]
//   const progressNum = useMemo(()=> q ? idx+1 : 0, [idx, q])

//   function onSelect(i){ if (locked || busy) return; setSelections(prev=>({ ...prev, [q.id]: i })) }

//   async function handleLock(auto=false){
//     if (locked) return
//     setBusy(true)
//     setLocked(true)
//     clearInterval(timerRef.current)
//     // small delay to show lock then next
//     await new Promise(r=>setTimeout(r, 600))
//     if (idx < questions.length-1){
//       setIdx(s=>s+1); setLocked(false); setBusy(false)
//     } else {
//       const score = computeScore(questions, selections)
//       const entry = { id: Date.now(), score, total: questions.length, pct: Math.round((score/questions.length)*100), ts: Date.now(), difficulty }
//       saveHighScore(entry)
//       nav('/results', { state: { questions, selections, difficulty } })
//     }
//   }

//   function nextManual(){
//     if (!locked && selections[q.id] === undefined) return // prevent forward without selection
//     handleLock(false)
//   }

//   function prev(){ if (idx>0){ setIdx(i=>i-1); setLocked(false) } }

//   if (loading) return <div className='max-w-3xl mx-auto p-6 bg-red dark:bg-gray-800 rounded-2xl blue'>Loading...</div>
//   if (error && questions.length === 0) return (
//     <div className='max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow text-center'>
//       <p className='text-red-500'>{error}</p>
//       <button onClick={()=>location.reload()} className='mt-4 px-4 py-2 rounded bg-indigo-600 text-white'>Retry</button>
//     </div>
//   )
//   if (!q) return <div className='max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow'>No questions available</div>

//   const selectedIndex = selections[q.id]
//   const scoreNow = computeScore(questions, selections)

//   return (
//     <div className='max-w-3xl mx-auto p-6 bg-black dark:bg-gray-800 rounded-2xl black'>
//       <div className='flex items-center justify-between mb-4'>
//         <ProgressBar current={progressNum} total={questions.length} />
//         <div className='text-sm text-gray-600 dark:text-gray-300'>
//           <div>Time</div>
//           <div className='font-mono text-lg'>{String(Math.floor(timeLeft/60)).padStart(2,'0')}:{String(timeLeft%60).padStart(2,'0')}</div>
//         </div>
//       </div>

//       <div className='flex justify-between items-start gap-4'>
//         <div className='flex-1'>
//           <div className='text-xs text-gray-500 dark:text-gray-400'>{q.category} · {q.difficulty}</div>
//           <h2 className='mt-2 text-lg font-semibold' dangerouslySetInnerHTML={{ __html: q.question }} />

//           <QuestionCard q={q} selectedIndex={selectedIndex} locked={locked} onSelect={(i)=> onSelect(i)} onKey={(e,i)=>{ if (e.key === 'Enter') onSelect(i) }} />
//         </div>

//         <aside className='w-40 hidden md:block'>
//           <div className='p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-center'>
//             <div className='text-sm text-gray-500'>Score so far</div>
//             <div className='text-2xl font-bold mt-2'>{scoreNow}/{questions.length}</div>
//             <div className='text-xs text-gray-400 mt-1'>(locked answers counted)</div>
//           </div>
//         </aside>
//       </div>

//       <div className='mt-6 flex justify-between items-center gap-3'>
//         <div className='flex gap-2'>
//           <button onClick={prev} disabled={idx===0} className='px-3 py-2 rounded-md border disabled:opacity-50'>Previous</button>
//           {!locked ? (
//             <>
//               <button onClick={()=>handleLock(false)} disabled={selections[q.id] === undefined || busy} className='px-3 py-2 rounded-md bg-indigo-600 text-white focus:ring-2 focus:ring-indigo-300'>Lock Answer</button>
//               <button onClick={()=>{ setSelections(prev=>({ ...prev, [q.id]: -1 })); handleLock(true); }} className='px-3 py-2 rounded-md border'>Skip</button>
//             </>
//           ) : (
//             <button onClick={nextManual} className='px-4 py-2 rounded-md bg-green-600 text-white'>{idx===questions.length-1 ? 'Finish' : 'Next'}</button>
//           )}
//         </div>

//         <div className='text-sm text-gray-500'>Tip: Use <kbd className='px-2 py-1 bg-gray-200 rounded'>&larr;</kbd> / <kbd className='px-2 py-1 bg-gray-200 rounded'>&rarr;</kbd> to nav</div>
//       </div>
//     </div>
//   )
// }

// function computeScore(questions, selections){
//   let score = 0
//   for (const q of questions){
//     const sel = selections[q.id]
//     if (sel !== undefined && sel !== -1 && q.answers[sel] === q.answers[q.correctIndex]) score++
//   }
//   return score
// }
// 🔹 Changes made:
// - Changed text-gray-400/500 in dark mode → lighter shades (text-gray-200 or text-gray-300)
// - Ensured category, timer, and score sidebar are bright enough
// - Buttons styled consistently for dark mode

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'
import { normalizeOpenTDB } from '../utils'
import { motion } from 'framer-motion'

const HS_KEY = 'quiz.highscores'
function saveHighScore(entry){
  try{
    const prev = JSON.parse(localStorage.getItem(HS_KEY) || '[]')
    const next = [entry, ...prev].slice(0,10)
    localStorage.setItem(HS_KEY, JSON.stringify(next))
  }catch{}
}

export default function Quiz(){
  const nav = useNavigate()
  const params = new URLSearchParams(location.search)
  const difficulty = params.get('difficulty') || 'easy'
  const amount = Number(params.get('amount') || 5)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [questions, setQuestions] = useState([])

  const [idx, setIdx] = useState(0)
  const [selections, setSelections] = useState({})
  const [locked, setLocked] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const timerRef = useRef(null)
  const [busy, setBusy] = useState(false)

  useEffect(()=>{
    let active = true
    async function load(){
      setLoading(true); setError('')
      try{
        const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
        const controller = new AbortController()
        const id = setTimeout(()=> controller.abort(), 8000)
        const res = await fetch(url, { cache: 'no-store', signal: controller.signal })
        clearTimeout(id)
        if (!res.ok) throw new Error('Network error')
        const data = await res.json()
        let qs = Array.isArray(data?.results) && data.results.length ? normalizeOpenTDB(data.results) : []
        if (!qs.length){
          const local = await fetch('/questions.json').then(r=>r.json())
          qs = normalizeOpenTDB(local.slice(0, amount))
        }
        if (!active) return
        setQuestions(qs)
        setIdx(0); setSelections({}); setLocked(false); setTimeLeft(30)
      }catch(e){
        console.error(e)
        try{
          const local = await fetch('/questions.json').then(r=>r.json())
          const qs = normalizeOpenTDB(local.slice(0, amount))
          if (!active) return
          setQuestions(qs); setError('Using local fallback questions.')
        }catch(e2){
          setError('Failed to load questions. Check connection.')
        }
      }finally{ if (active) setLoading(false) }
    }
    load()
    return ()=>{ active=false; clearInterval(timerRef.current) }
  }, [difficulty, amount])

  useEffect(()=>{
    clearInterval(timerRef.current)
    setTimeLeft(30)
    timerRef.current = setInterval(()=>{
      setTimeLeft(t=>{
        if (t <= 1){
          clearInterval(timerRef.current)
          handleLock(true)
          return 0
        }
        return t-1
      })
    }, 1000)
    return ()=> clearInterval(timerRef.current)
  }, [idx, questions])

  const q = questions[idx]
  const progressNum = useMemo(()=> q ? idx+1 : 0, [idx, q])

  function onSelect(i){ if (locked || busy) return; setSelections(prev=>({ ...prev, [q.id]: i })) }

  async function handleLock(auto=false){
    if (locked) return
    setBusy(true)
    setLocked(true)
    clearInterval(timerRef.current)
    await new Promise(r=>setTimeout(r, 600))
    if (idx < questions.length-1){
      setIdx(s=>s+1); setLocked(false); setBusy(false)
    } else {
      const score = computeScore(questions, selections)
      const entry = { id: Date.now(), score, total: questions.length, pct: Math.round((score/questions.length)*100), ts: Date.now(), difficulty }
      saveHighScore(entry)
      nav('/results', { state: { questions, selections, difficulty } })
    }
  }

  function nextManual(){
    if (!locked && selections[q.id] === undefined) return
    handleLock(false)
  }

  function prev(){ if (idx>0){ setIdx(i=>i-1); setLocked(false) } }

  if (loading) return <div className='max-w-3xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-2xl'>Loading...</div>
  if (error && questions.length === 0) return (
    <div className='max-w-3xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-2xl shadow text-center'>
      <p className='text-red-400'>{error}</p>
      <button onClick={()=>location.reload()} className='mt-4 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white'>Retry</button>
    </div>
  )
  if (!q) return <div className='max-w-3xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-2xl shadow'>No questions available</div>

  const selectedIndex = selections[q.id]
  const scoreNow = computeScore(questions, selections)

  return (
    <div className='max-w-3xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-2xl shadow-lg'>
      <div className='flex items-center justify-between mb-4'>
        <ProgressBar current={progressNum} total={questions.length} />
        <div className='text-sm text-gray-300'>
          <div>Time</div>
          <div className='font-mono text-lg text-gray-100'>{String(Math.floor(timeLeft/60)).padStart(2,'0')}:{String(timeLeft%60).padStart(2,'0')}</div>
        </div>
      </div>

      <div className='flex justify-between items-start gap-4'>
        <div className='flex-1'>
          <div className='text-xs text-gray-300'>{q.category} · {q.difficulty}</div>
          <h2 className='mt-2 text-lg font-semibold text-white' dangerouslySetInnerHTML={{ __html: q.question }} />

          <QuestionCard q={q} selectedIndex={selectedIndex} locked={locked} onSelect={(i)=> onSelect(i)} onKey={(e,i)=>{ if (e.key === 'Enter') onSelect(i) }} />
        </div>

        <aside className='w-40 hidden md:block'>
          <div className='p-3 rounded-lg bg-gray-800 text-center'>
            <div className='text-sm text-gray-300'>Score so far</div>
            <div className='text-2xl font-bold mt-2 text-white'>{scoreNow}/{questions.length}</div>
            <div className='text-xs text-gray-400 mt-1'>(locked answers counted)</div>
          </div>
        </aside>
      </div>

      <div className='mt-6 flex justify-between items-center gap-3'>
        <div className='flex gap-2'>
          <button onClick={prev} disabled={idx===0} className='px-3 py-2 rounded-md border border-gray-600 text-gray-200 disabled:opacity-50'>Previous</button>
          {!locked ? (
            <>
              <button onClick={()=>handleLock(false)} disabled={selections[q.id] === undefined || busy} className='px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-2 focus:ring-indigo-300'>Lock Answer</button>
              <button onClick={()=>{ setSelections(prev=>({ ...prev, [q.id]: -1 })); handleLock(true); }} className='px-3 py-2 rounded-md border border-gray-600 text-gray-200'>Skip</button>
            </>
          ) : (
            <button onClick={nextManual} className='px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white'>{idx===questions.length-1 ? 'Finish' : 'Next'}</button>
          )}
        </div>

        <div className='text-sm text-gray-300'>
          Tip: Use <kbd className='px-2 py-1 bg-gray-700 rounded text-gray-100'>&larr;</kbd> / <kbd className='px-2 py-1 bg-gray-700 rounded text-gray-100'>&rarr;</kbd> to nav
        </div>
      </div>
    </div>
  )
}

function computeScore(questions, selections){
  let score = 0
  for (const q of questions){
    const sel = selections[q.id]
    if (sel !== undefined && sel !== -1 && q.answers[sel] === q.answers[q.correctIndex]) score++
  }
  return score
}
