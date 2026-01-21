const quizzes = {
  religious: [
    {
      q: "كم عدد أركان الإسلام؟",
      options: ["3", "4", "5", "6"],
      answer: 2
    }
  ],
  culture: [
    {
      q: "من هو مؤسس المملكة العربية السعودية؟",
      options: ["الملك فيصل", "الملك عبدالعزيز", "الملك سعود", "الملك خالد"],
      answer: 1
    }
  ],
  education: [
    {
      q: "ما ناتج 5 × 6 ؟",
      options: ["30", "11", "25", "35"],
      answer: 0
    }
  ],
  fun: [
    {
      q: "أي حيوان ينام واقفًا؟",
      options: ["الأسد", "الحصان", "القط", "الكلب"],
      answer: 1
    }
  ],
  skills: [
    {
      q: "أي من التالي مهارة حياتية؟",
      options: ["الحفظ", "التواصل", "النسخ", "التلقين"],
      answer: 1
    }
  ]
};

let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

// عناصر الصفحة
const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const feedback = document.getElementById("feedback");
const resultPage = document.getElementById("resultPage");
const scoreText = document.getElementById("scoreText");
const finalText = document.getElementById("finalText");
const progressBar = document.getElementById("progressBar");

// الأصوات
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");

function startQuiz(type) {
  currentQuiz = quizzes[type];
  currentIndex = 0;
  score = 0;

  home.classList.add("hidden");
  quiz.classList.remove("hidden");

  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  feedback.classList.add("hidden");
  optionsEl.innerHTML = "";

  const q = currentQuiz[currentIndex];
  questionEl.textContent = q.q;

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });

  updateProgress();
  startTimer();
}

function startTimer() {
  timeLeft = 15;
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      showWrong("⏰ انتهى الوقت");
    }
  }, 1000);
}

function checkAnswer(index) {
  clearInterval(timer);

  if (index === currentQuiz[currentIndex].answer) {
    score++;
    showCorrect();
  } else {
    showWrong("❌ إجابة خاطئة");
  }
}

function showCorrect() {
  correctSound.play();
  feedback.innerHTML = "😀 أحسنت! إجابة صحيحة";
  feedback.classList.remove("hidden");

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  });

  next();
}

function showWrong(text) {
  wrongSound.play();
  feedback.innerHTML = text + "<br>🙁 حاول مرة أخرى";
  feedback.classList.remove("hidden");
  next();
}

function next() {
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < currentQuiz.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1800);
}

function showResult() {
  quiz.classList.add("hidden");
  resultPage.classList.remove("hidden");

  winSound.play();
  finalText.textContent = "🎉 انتهى النشاط";
  scoreText.textContent = `نتيجتك: ${score} / ${currentQuiz.length}`;
}

function updateProgress() {
  const percent = ((currentIndex) / currentQuiz.length) * 100;
  progressBar.style.width = percent + "%";
}

// قسم المعلمة
function showTeacher() {
  home.classList.add("hidden");
  document.getElementById("teacher").classList.remove("hidden");
}

function suggest() {
  const time = document.getElementById("lessonTime").value;
  document.getElementById("result").textContent =
    `✨ نقترح نشاط تفاعلي مدته ${time} دقائق لتنشيط الطالبات`;
}
