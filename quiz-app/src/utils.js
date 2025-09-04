export function decodeHTML(str = ''){
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

export function shuffle(arr){
  const a = [...arr];
  for (let i = a.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function normalizeOpenTDB(results = []){
  return results.map((q, idx) => {
    const answers = shuffle([q.correct_answer, ...q.incorrect_answers].map(decodeHTML));
    const correctIndex = answers.indexOf(decodeHTML(q.correct_answer));
    return {
      id: `${idx}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      question: decodeHTML(q.question),
      answers,
      correctIndex,
      correct_answer: decodeHTML(q.correct_answer),
      category: q.category || '',
      difficulty: q.difficulty || 'easy'
    }
  })
}
