let currentSection = [];
let currentIndex = 0;
let score = 0;

const sectionsData = {

    cultural: [
        { q: "ما هي عاصمة السعودية؟", c: ["جدة", "الرياض", "مكة"], a: 1 },
        { q: "كم عدد القارات؟", c: ["5", "6", "7"], a: 2 },
        { q: "من اخترع المصباح؟", c: ["نيوتن", "أديسون", "غاليليو"], a: 1 },
        { q: "أكبر محيط؟", c: ["الأطلسي", "الهادي", "الهندي"], a: 1 },
        { q: "اللغة الأكثر انتشارًا؟", c: ["العربية", "الإنجليزية", "الصينية"], a: 2 }
    ],

    religious: [
        { q: "عدد أركان الإسلام؟", c: ["4", "5", "6"], a: 1 },
        { q: "أول سورة؟", c: ["البقرة", "الفاتحة", "الناس"], a: 1 },
        { q: "عدد الصلوات؟", c: ["4", "5", "6"], a: 1 },
        { q: "قبلة المسلمين؟", c: ["المدينة", "القدس", "مكة"], a: 2 },
        { q: "شهر الصيام؟", c: ["شعبان", "رمضان", "ذو الحجة"], a: 1 }
    ],

    fun: [
        { q: "كم عدد أيام الأسبوع؟", c: ["5", "6", "7"], a: 2 },
        { q: "لون السماء؟", c: ["أخضر", "أزرق", "أحمر"], a: 1 },
        { q: "أسرع حيوان؟", c: ["الفهد", "الحصان", "الأسد"], a: 0 },
        { q: "كم عين للإنسان؟", c: ["1", "2", "3"], a: 1 },
        { q: "ننام بالليل؟", c: ["نعم", "لا"], a: 0 }
    ],

    educational: [
        { q: "2 + 2 =", c: ["3", "4", "5"], a: 1 },
        { q: "الماء يتجمد عند؟", c: ["0", "50", "100"], a: 0 },
        { q: "الحاسوب جهاز؟", c: ["حي", "غير حي"], a: 1 },
        { q: "الحروف العربية؟", c: ["26", "28", "30"], a: 1 },
        { q: "الشمس نجم؟", c: ["نعم", "لا"], a: 0 }
    ],

    skills: [
        { q: "أفضل عمل جماعي؟", c: ["التعاون", "الفوضى", "التجاهل"], a: 0 },
        { q: "حل المشكلة يبدأ بـ؟", c: ["الهروب", "التفكير", "الكسل"], a: 1 },
        { q: "الاستماع مهارة؟", c: ["نعم", "لا"], a: 0 },
        { q: "تنظيم الوقت مهم؟", c: ["نعم", "لا"], a: 0 },
        { q: "الخطأ يساعدنا؟", c: ["نعم", "لا"], a: 0 }
    ]
};

function startSection(type) {
    currentSection = sectionsData[type];
    currentIndex = 0;
    score = 0;

    document.getElementById("sections").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    const q = currentSection[currentIndex];
    document.getElementById("questionText").textContent = q.q;
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    document.getElementById("feedback").textContent = "";

    q.c.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.onclick = () => checkAnswer(index);
        choicesDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const q = currentSection[currentIndex];

    if (selected === q.a) {
        score++;
        document.getElementById("correctSound").play();
        document.getElementById("feedback").textContent = "✅ إجابة صحيحة";
    } else {
        document.getElementById("wrongSound").play();
        document.getElementById("feedback").textContent = "❌ إجابة خاطئة";
    }

    setTimeout(() => {
        currentIndex++;
        if (currentIndex < currentSection.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 800);
}

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("scoreText").textContent =
        `درجتك: ${score} من ${currentSection.length}`;

    const clap = document.getElementById("clapSound");
    clap.play();
    setTimeout(() => clap.pause(), 3000);
}

function goBack() {
    document.getElementById("result").classList.add("hidden");
    document.getElementById("sections").classList.remove("hidden");
}
