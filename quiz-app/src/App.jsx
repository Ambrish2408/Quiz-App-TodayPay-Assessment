import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Start from './pages/Start'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import { motion } from 'framer-motion'

export default function App(){
  const [dark, setDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false)

  useEffect(()=>{
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
      <nav className='flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800'>
        <Link to='/' className='text-xl font-bold'>Quiz App</Link>
        <div className='flex items-center gap-3'>
          <button onClick={()=>setDark(!dark)} className='px-3 py-1 rounded bg-indigo-600 text-red hover:bg-indigo-700'>
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>

      <main className='p-6'>
        <Routes>
          <Route path='/' element={<Start/>} />
          <Route path='/quiz' element={<Quiz/>} />
          <Route path='/results' element={<Results/>} />
        </Routes>
      </main>
    </div>
  )
}
