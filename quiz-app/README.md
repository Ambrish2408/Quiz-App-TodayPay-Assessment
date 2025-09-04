# 🎯 React Quiz App

A modern **Quiz Application** built with **React + Vite + TailwindCSS**.  
It provides a clean UI/UX, smooth quiz flow, score tracking, and a results page.  
You can load questions either from the **Open Trivia DB API** or a local JSON file.

---

## 🚀 Features

### 🖌️ UI/UX
- 📱 **Responsive Design** — works seamlessly on desktop & mobile.
- 🎨 Clean layout with modern typography (Inter/Roboto/system fonts).
- 🔀 One question at a time with **4 options**.
- 🧭 Clear navigation: **Next, Previous/Skip (if enabled), Submit/Finish**.
- 📊 Progress indicator & **score tracking**.
- ✨ Smooth animations with **Framer Motion**.

---

### 🧩 Core Functionality
- **Quiz Page**
  - Load **5–10 multiple-choice questions**.
  - Show one question at a time with four answer options.
  - Prevent progressing without selecting an answer (unless Skip is allowed).
- **Score Tracking**
  - Track **correct/incorrect answers**.
  - Final score display (e.g., *“You scored 7/10”*).
- **Results Page**
  - Summary of answers (selected vs correct).
  - Clear feedback on mistakes.
  - **Restart Quiz** button to reset state.

---

### ⚙️ Technical Details
- Built with **React functional components + hooks** (`useState`, `useEffect`).
- State-driven quiz flow:
  - Load questions → Answer → Next → Results.
- Styled using **TailwindCSS** for fast, modern UI.
- Supports **React Router** (`/quiz`, `/results`) for navigation.
- Fetch questions from:
  - **Open Trivia DB API**: [https://opentdb.com/api_config.php](https://opentdb.com/api_config.php)
  - OR from a bundled `questions.json`.

---

### 🧪 Testing & Reliability
- Handles **edge cases**:  
  - No internet / API failures  
  - Empty or short data sets  
  - Rapid clicks or page refreshes  
- Prevents skipping without an answer (unless feature is enabled).
- Optimized for **mobile responsiveness**.

---

### 🎁 Bonus Features (Optional Enhancements)
- ⏱️ **Timer per question** (auto-lock after 30s).
- 📊 Progress bar (e.g., “Question 3 of 10”).
- 🎚️ Difficulty levels (Easy / Medium / Hard).
- 🏆 Save high scores using **localStorage**.
- ✨ Subtle animations (fade-in questions, button click feedback).
- ♿ Accessibility improvements (keyboard navigation, ARIA labels).

---

## 🛠️ Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Ambrish2408/Quiz-App-TodayPay-Assessment
   cd quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run locally**
   ```bash
   npm run dev
   ```
   App will be available at 👉 `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 🌍 Deployment

- **Netlify (Recommended)**  
  Add a `_redirects` file in `public/` with:
  ```
  /*    /index.html   200
  ```
  Then run `npm run build` and deploy the `dist/` folder.

- **Vercel**  
  Use `vercel.json` with rewrites to `index.html`.

- **GitHub Pages**  
  Add `gh-pages` and set `"homepage"` in `package.json`.

---

## 📸 Screenshots 

## ▶️ Demo Vedio
---

## 📜 License
This project is open-source and free to use. 🚀

