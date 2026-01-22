/* =============================
   عناصر الصفحة
============================= */
const home = document.getElementById("home");
const content = document.getElementById("content");
const sectionTitle = document.getElementById("sectionTitle");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const textInput = document.getElementById("textInput");
const questionBox = document.getElementById("questionBox");

/* =============================
   بيانات الأسئلة
============================= */

const mixedActivities = {
  title: "أنشطة متنوّعة",
  categories: {
    religious: {
      title: "نشاط ديني",
      questions: [
        { q: "ما أول سورة في القرآن؟", a: ["البقرة", "الفاتحة", "العلق"], c: 1 },
        { q: "كم عدد الصلوات المفروضة؟", a: ["4", "5", "6"], c: 1 },
        { q: "ما اسم ليلة القدر؟", a: ["خير من ألف شهر", "ليلة النور", "ليلة السلام"], c: 0 },
        { q: "ما قبلة المسلمين؟", a: ["المسجد الأقصى", "المسجد النبوي", "الكعبة"], c: 2 },
        { q: "ما الركن الأول من أركان الإسلام؟", a: ["الصلاة", "الشهادة", "الزكاة"], c: 1 }
      ]
    },

    cultural: {
      title: "نشاط ثقافي",
      questions: [
        { q: "ما عاصمة السعودية؟", a: ["جدة", "الرياض", "مكة"], c: 1 },
        { q: "كم عدد القارات؟", a: ["5", "6", "7"], c: 2 },
        { q: "من اخترع الهاتف؟", a: ["نيوتن", "غراهام بيل", "أديسون"], c: 1 },
        { q: "ما أطول نهر في العالم؟", a: ["النيل", "الأمازون", "الفرات"], c: 0 },
        { q: "ما لغة البرازيل؟", a: ["الإسبانية", "البرتغالية", "الإنجليزية"], c: 1 }
      ]
    },

    educational: {
      title: "نشاط تعليمي",
      questions: [
        { q: "ناتج 6 × 7؟", a: ["42", "36", "48"], c: 0 },
        { q: "أيهم كوكب؟", a: ["الشمس", "القمر", "المريخ"], c: 2 },
        { q: "ما وحدة قياس الطول؟", a: ["الكيلو", "المتر", "الجرام"], c: 1 },
        { q: "كم أضلاع المثلث؟", a: ["2", "3", "4"], c: 1 },
        { q: "أيهم مادة صلبة؟", a: ["الهواء", "الماء", "الحديد"], c: 2 }
      ]
    },

    fun: {
      title: "نشاط ترفيهي",
      questions: [
        { q: "ما الشيء الذي يمشي بلا قدمين؟", a: ["الماء", "الظل", "الوقت"], c: 0 },
        { q: "ما الشيء الذي نراه ولا نلمسه؟", a: ["الهواء", "الماء", "الحجر"], c: 0 },
        { q: "ما لونه السماء؟", a: ["أخضر", "أزرق", "أحمر"], c: 1 },
        { q: "كم يوم في الأسبوع؟", a: ["5", "6", "7"], c: 2 },
        { q: "ما الحيوان الأسرع؟", a: ["الفهد", "الحصان", "الأسد"], c: 0 }
      ]
    },

    skills: {
      title: "نشاط مهاري",
      questions: [
        { q: "أي مهارة تساعد على الحوار؟", a: ["الاستماع", "الصراخ", "التجاهل"], c: 0 },
        { q: "العمل الجماعي يعني؟", a: ["العمل وحدك", "التعاون", "التنافس"], c: 1 },
        { q: "إدارة الوقت تعني؟", a: ["التأجيل", "التنظيم", "الإهمال"], c: 1 },
        { q: "أي سلوك إيجابي؟", a: ["الاحترام", "السخرية", "العناد"], c: 0 },
        { q: "حل المشكلات يحتاج إلى؟", a: ["تفكير", "عشوائية", "سرعة فقط"], c: 0 }
      ]
    },

    teacher: {
      title: "للـمعلمة",
      text: "💡 اقترح على الطالبات نشاطًا يناسب زمن الحصة:\n\n- 10 دقائق: سؤال اليوم\n- 20 دقيقة: حوار جماعي\n- 30 دقيقة: تحدي جماعي"
    }
  }
};

/* =============================
   متغيرات التحكم
============================= */
let currentQuestions = [];
let currentIndex = 0;
let score = 0;

/* =============================
   التنقل
============================= */

function openSection(type) {
  home.classList.add("hidden");
  content.classList.remove("hidden");

  if (type === "activities") {
    showActivitiesMenu();
    return;
  }

  loadSimpleSection(type);
}

function goHome() {
  content.classList.add("hidden");
  home.classList.remove("hidden");
}

/* =============================
   أنشطة متنوّعة (القائمة)
============================= */

function showActivitiesMenu() {
  sectionTitle.innerText = "أنشطة متنوّعة";
  questionBox.style.display = "none";
  textInput.style.display = "none";
  optionsDiv.innerHTML = "";
  feedback.innerText = "";

  optionsDiv.innerHTML = `
    <button onclick="startMixed('religious')">ديني</button>
    <button onclick="startMixed('cultural')">ثقافي</button>
    <button onclick="startMixed('educational')">تعليمي</button>
    <button onclick="startMixed('fun')">ترفيهي</button>
    <button onclick="startMixed('skills')">مهاري</button>
    <button onclick="showTeacher()">للمعلمة</button>
  `;
}

function startMixed(key) {
  const cat = mixedActivities.categories[key];
  sectionTitle.innerText = cat.title;
  currentQuestions = cat.questions;
  currentIndex = 0;
  score = 0;
  questionBox.style.display = "block";
  showQuestion();
}

function showTeacher() {
  sectionTitle.innerText = mixedActivities.categories.teacher.title;
  questionBox.style.display = "none";
  optionsDiv.innerHTML = "";
  textInput.style.display = "block";
  textInput.value = mixedActivities.categories.teacher.text;
}

/* =============================
   عرض الأسئلة
============================= */

function showQuestion() {
  const q = currentQuestions[currentIndex];
  questionText.innerText = q.q;
  optionsDiv.innerHTML = "";
  feedback.innerText = "";

  q.a.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(choice) {
  if (choice === currentQuestions[currentIndex].c) {
    score++;
    feedback.innerText = "✅ إجابة صحيحة";
  } else {
    feedback.innerText = "❌ محاولة جيدة";
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
      showQuestion();
    } else {
      questionText.innerText = `انتهى النشاط 🎉 نتيجتك ${score}/5`;
      optionsDiv.innerHTML = "";
    }
  }, 700);
}
