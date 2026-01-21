const quizzes = {
    religious: [
        { q: "كم عدد أركان الإسلام؟", o: ["4", "5", "6", "7"], a: 1 },
        { q: "ما أول سورة في القرآن؟", o: ["الفاتحة", "البقرة", "العلق", "الناس"], a: 0 },
        { q: "كم عدد الصلوات؟", o: ["4", "5", "6", "7"], a: 1 },
        { q: "في أي شهر نصوم؟", o: ["شعبان", "رجب", "رمضان", "ذو الحجة"], a: 2 },
        { q: "قبلة المسلمين؟", o: ["المدينة", "مكة", "الأقصى", "الطائف"], a: 1 }
    ],
    culture: [
        { q: "مؤسس المملكة؟", o: ["عبدالعزيز", "فيصل", "سعود", "خالد"], a: 0 },
        { q: "عاصمة السعودية؟", o: ["جدة", "مكة", "الرياض", "الدمام"], a: 2 },
        { q: "اليوم الوطني؟", o: ["سبتمبر", "أكتوبر", "أغسطس", "يوليو"], a: 0 },
        { q: "رؤية المملكة؟", o: ["2020", "2030", "2040", "2050"], a: 1 },
        { q: "لغة الدولة؟", o: ["إنجليزية", "تركية", "عربية", "فرنسية"], a: 2 }
    ]
};

let quiz = [];
let index = 0;
let score = 0;
let timer;
let time = 15;

const homePage = document.getElementById("homePage");
const quizPage = document.getElementById("quizPage");
const resultPage = document.getElementById("resultPage");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const feedback = document.getElementById("feedback");
const scoreText = document.getElementById("scoreText");

function openQuiz(type) {
    quiz = quizzes[type];
    index = 0;
    score = 0;
    homePage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    feedback.classList.add("hidden");
    optionsEl.innerHTML = "";

    const q = quiz[index];
    questionEl.textContent = q.q;

    q.o.forEach((opt, i) => {
        const b = document.createElement("button");
        b.className = "option-btn";
        b.textContent = opt;
        b.onclick = () => check(i);
        optionsEl.appendChild(b);
    });

    startTimer();
}

function startTimer() {
    time = 15;
    timeEl.textContent = time;
    timer = setInterval(() => {
        time--;
        timeEl.textContent = time;
        if (time === 0) {
            clearInterval(timer);
            wrong();
        }
    }, 1000);
}

function check(i) {
    clearInterval(timer);
    i === quiz[index].a ? correct() : wrong();
}

function correct() {
    score++;
    document.getElementById("correctSound").play();
    feedback.textContent = "😀 أحسنت";
    feedback.classList.remove("hidden");
    next();
}

function wrong() {
    document.getElementById("wrongSound").play();
    feedback.textContent = "🙁 حاول مرة أخرى";
    feedback.classList.remove("hidden");
    next();
}

function next() {
    setTimeout(() => {
        index++;
        index < quiz.length ? loadQuestion() : showResult();
    }, 1200);
}

function showResult() {
    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    document.getElementById("winSound").play();
    scoreText.textContent = `${score} / ${quiz.length}`;
}

function goHome() {
    location.reload();
}
