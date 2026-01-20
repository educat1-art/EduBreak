let score = 0;
let current = 0;
let timer;
let timeLeft = 15;
let activeQuiz = [];

const winSound = document.getElementById("winSound");

// تفعيل الصوت (حل مشكلة المتصفح)
function initSound() {
    winSound.play().then(() => {
        winSound.pause();
        winSound.currentTime = 0;
    }).catch(() => { });
}

const quizzes = {
    religious: [
        { q: "ما السورة التي لا تبدأ بالبسملة؟", o: ["التوبة", "الكهف", "يس"], a: 0 },
        { q: "كم عدد القراءات المتواترة؟", o: ["7", "10", "14"], a: 1 },
        { q: "أول من جمع القرآن؟", o: ["أبو بكر", "عمر", "عثمان"], a: 0 },
        { q: "ما أطول آية؟", o: ["آية الدين", "الكرسي", "النور"], a: 0 },
        { q: "كم عدد الأنبياء؟", o: ["25", "124000", "313"], a: 0 }
    ],
    culture: [
        { q: "متى توحيد المملكة؟", o: ["1932", "1927", "1940"], a: 0 },
        { q: "أكبر قارة؟", o: ["آسيا", "أفريقيا", "أوروبا"], a: 0 },
        { q: "مؤسس علم الاجتماع؟", o: ["ابن خلدون", "أرسطو", "أفلاطون"], a: 0 },
        { q: "أطول نهر؟", o: ["النيل", "الأمازون", "الدانوب"], a: 0 },
        { q: "عاصمة أستراليا؟", o: ["كانبرا", "سيدني", "ملبورن"], a: 0 }
    ],
    education: [
        { q: "√144 = ؟", o: ["12", "14", "10"], a: 0 },
        { q: "π تقريبا؟", o: ["3.14", "2.17", "4.1"], a: 0 },
        { q: "عدد الكواكب؟", o: ["8", "9", "7"], a: 0 },
        { q: "العدد الأولي؟", o: ["11", "21", "27"], a: 0 },
        { q: "سرعة الضوء كم؟", o: ["300 ألف كم/ث", "150 ألف", "1 مليون"], a: 0 }
    ],
    fun: [
        { q: "أسرع حيوان؟", o: ["الفهد", "الحصان", "الذئب"], a: 0 },
        { q: "كم ثانية في الساعة؟", o: ["3600", "600", "1000"], a: 0 },
        { q: "أكثر لون انتشار؟", o: ["الأزرق", "الأحمر", "الأخضر"], a: 0 },
        { q: "أكبر محيط؟", o: ["الهادئ", "الأطلسي", "الهندي"], a: 0 },
        { q: "كم يوم بالسنة؟", o: ["365", "360", "366"], a: 0 }
    ],
    skills: [
        { q: "أفضل مهارة للقيادة؟", o: ["التأثير", "الأوامر", "الصراخ"], a: 0 },
        { q: "حل المشكلات يبدأ بـ؟", o: ["الفهم", "الحل", "التنفيذ"], a: 0 },
        { q: "التواصل الفعال يعني؟", o: ["استماع", "حديث", "صمت"], a: 0 },
        { q: "العمل الجماعي؟", o: ["تعاون", "تنافس", "فردية"], a: 0 },
        { q: "إدارة الوقت تعني؟", o: ["تنظيم", "تأجيل", "إهمال"], a: 0 }
    ]
};

function startQuiz(type) {
    activeQuiz = quizzes[type];
    document.getElementById("home").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    score = 0;
    current = 0;
    nextQuestion();
}

function nextQuestion() {
    if (current >= activeQuiz.length) {
        alert("🎉 انتهت المسابقة! مجموعك: " + score);
        location.reload();
        return;
    }

    timeLeft = 15;
    document.getElementById("time").innerText = timeLeft;
    document.getElementById("score").innerText = score;

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            current++;
            nextQuestion();
        }
    }, 1000);

    const q = activeQuiz[current];
    document.getElementById("question").innerText = q.q;
    const options = document.getElementById("options");
    options.innerHTML = "";

    q.o.forEach((op, i) => {
        const div = document.createElement("div");
        div.className = "option";
        div.innerText = op;
        div.onclick = () => check(i);
        options.appendChild(div);
    });
}

function check(i) {
    if (i === activeQuiz[current].a) {
        score += 10;
        winSound.currentTime = 0;
        winSound.play();
        current++;
        setTimeout(nextQuestion, 500);
    }
}

function showTeacher() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("teacher").classList.remove("hidden");
}

function suggest() {
    const t = document.getElementById("lessonTime").value;
    const r = document.getElementById("result");
    if (t == 10) r.innerText = "⚡ مسابقة سريعة أو سؤال تفكير.";
    if (t == 20) r.innerText = "🎯 تحدي جماعي أو لعبة ثقافية.";
    if (t == 30) r.innerText = "🧩 نشاط مهاري مع نقاش.";
}
