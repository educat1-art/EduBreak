const questions = {
    religious: [
        { q: "ما هو الركن الثاني في الإسلام؟", options: ["الصلاة", "الزكاة", "الصوم", "الحج"], answer: 0 },
        { q: "كم عدد ركعات صلاة الفجر؟", options: ["2", "3", "4", "1"], answer: 0 },
        { q: "أول سورة في القرآن؟", options: ["البقرة", "الفاتحة", "الإخلاص", "الناس"], answer: 1 },
        { q: "من هو آخر الأنبياء؟", options: ["موسى", "محمد", "عيسى", "نوح"], answer: 1 },
        { q: "ما هي القبلة؟", options: ["البيت الحرام", "المسجد النبوي", "القدس", "الكعبة"], answer: 3 },
    ],
    culture: [
        { q: "ما عاصمة المملكة العربية السعودية؟", options: ["جدة", "الرياض", "مكة", "المدينة"], answer: 1 },
        { q: "أين تقع الأهرامات؟", options: ["مصر", "المغرب", "تركيا", "العراق"], answer: 0 },
        { q: "أكبر قارة في العالم؟", options: ["أفريقيا", "آسيا", "أوروبا", "أمريكا"], answer: 1 },
        { q: "أول رئيس للولايات المتحدة؟", options: ["أبراهام لينكولن", "توماس جيفرسون", "جورج واشنطن", "جون كينيدي"], answer: 2 },
        { q: "ما هي لغة البرازيل الرسمية؟", options: ["الإسبانية", "البرتغالية", "الإنجليزية", "الفرنسية"], answer: 1 },
    ],
    education: [
        { q: "ما حاصل 5+7؟", options: ["11", "12", "13", "14"], answer: 1 },
        { q: "ما عدد الحروف في كلمة 'تعليم'؟", options: ["5", "6", "7", "4"], answer: 1 },
        { q: "كم جانب للمربع؟", options: ["2", "3", "4", "5"], answer: 2 },
        { q: "ما عكس كلمة 'صغير'؟", options: ["كبير", "ضخم", "طويل", "قصير"], answer: 0 },
        { q: "ما العدد الأولي بعد 7؟", options: ["8", "9", "10", "11"], answer: 3 },
    ],
    fun: [
        { q: "ما الحيوان الأسرع؟", options: ["السلحفاة", "الفهد", "الحصان", "الأسد"], answer: 1 },
        { q: "كم عدد أيام الأسبوع؟", options: ["5", "6", "7", "8"], answer: 2 },
        { q: "أيهم يطير؟", options: ["البطة", "الديك", "النعامة", "الخفاش"], answer: 3 },
        { q: "ما لون السماء الصافية؟", options: ["أزرق", "أحمر", "أخضر", "أصفر"], answer: 0 },
        { q: "ما نوع النشاط الرياضي؟", options: ["سباحة", "رقص", "قراءة", "رياضيات"], answer: 0 },
    ],
    skills: [
        { q: "ما أفضل طريقة لتنظيم الوقت؟", options: ["الفوضى", "الجدولة", "التأجيل", "اللعب"], answer: 1 },
        { q: "ماذا يساعد الحوار؟", options: ["التفاهم", "الجدال", "الصمت", "النوم"], answer: 0 },
        { q: "متى يكون العمل الجماعي مفيد؟", options: ["دائما", "أحيانا", "نادر", "أبدا"], answer: 0 },
        { q: "ماذا ينمي التفكير الناقد؟", options: ["الخيال", "الملاحظة", "التسويف", "الكسل"], answer: 1 },
        { q: "ما أفضل مهارة للتعلم؟", options: ["الاستماع", "التجاهل", "اللامبالاة", "الجلوس"], answer: 0 },
    ]
};

let currentQuiz = [], currentIndex = 0, score = 0, timeLeft = 15, timer;

function startQuiz(section) {
    currentQuiz = questions[section];
    currentIndex = 0; score = 0;
    document.getElementById('home').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    document.getElementById('feedback').innerHTML = '';
    if (currentIndex >= currentQuiz.length) {
        showResult();
        return;
    }
    document.getElementById('question').innerText = currentQuiz[currentIndex].q;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    currentQuiz[currentIndex].options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i);
        optionsDiv.appendChild(btn);
    });
    timeLeft = 15;
    document.getElementById('time').innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;
        if (timeLeft <= 0) { clearInterval(timer); checkAnswer(-1); }
    }, 1000);
}

function checkAnswer(choice) {
    clearInterval(timer);
    const correct = currentQuiz[currentIndex].answer;
    const feedbackDiv = document.getElementById('feedback');
    if (choice === correct) {
        score++;
        feedbackDiv.innerHTML = '✅ أحسنت!';
        document.getElementById('correctSound').play();
        confetti();
    } else {
        feedbackDiv.innerHTML = '❌ حاول مرة أخرى!';
        document.getElementById('wrongSound').play();
    }
    currentIndex++;
    setTimeout(loadQuestion, 1000);
}

function showResult() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('resultPage').classList.remove('hidden');
    document.getElementById('finalText').innerText = '🏆 النتيجة النهائية';
    document.getElementById('scoreText').innerText = `${score}/5`;
    if (score === 5) document.getElementById('winSound').play();
}

function backHome() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('teacher').classList.add('hidden');
    document.getElementById('resultPage').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
}

function showTeacher() {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('teacher').classList.remove('hidden');
}

function suggest() {
    const time = document.getElementById('lessonTime').value;
    document.getElementById('result').innerText = `⏱ نشاط مقترح لمدة ${time} دقيقة`;
}

/* Confetti */
function confetti() {
    confettiEffect = {
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    };
    confetti(confettiEffect);
}

/* Canvas نجوم متلألئة */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.onresize = resize;
resize();
for (let i = 0; i < 100; i++) {
    stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 1.5 + 0.5, alpha: Math.random() });
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        s.alpha += Math.random() * 0.02 - 0.01;
        if (s.alpha < 0) s.alpha = 0;
        if (s.alpha > 1) s.alpha = 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();
