let questions = [];
let index = 0;
let score = 0;

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");

const data = {
    religion: [
        {q:"ما معنى الاستطاعة في الحج؟", a:["المال فقط","القدرة الجسدية والمالية","العمر"], c:1},
        {q:"كم عدد السجدات في القرآن؟", a:["14","15","16"], c:1},
        {q:"أول من جمع القرآن؟", a:["عمر","أبو بكر","عثمان"], c:1},
        {q:"ما السورة التي ختمت بسجدة؟", a:["العلق","الانشقاق","النجم"], c:1},
        {q:"معنى (ليطغى)؟", a:["يتكبر","ينسى","يضعف"], c:0}
    ],
    culture: [
        {q:"سنة توحيد المملكة؟", a:["1927","1932","1918"], c:1},
        {q:"أكبر صحراء؟", a:["النفود","الربع الخالي","الدهناء"], c:1},
        {q:"مؤلف المقدمة؟", a:["الطبري","ابن خلدون","المسعودي"], c:1},
        {q:"أكثر لغة أصلية؟", a:["إنجليزية","صينية","إسبانية"], c:1},
        {q:"أكبر قارة؟", a:["أفريقيا","آسيا","أوروبا"], c:1}
    ],
    education: [
        {q:"3×4² = ؟", a:["48","36","24"], c:0},
        {q:"وحدة التيار؟", a:["فولت","أمبير","أوم"], c:1},
        {q:"الكوكب الأحمر؟", a:["المريخ","زحل","عطارد"], c:0},
        {q:"أصغر وحدة حية؟", a:["نسيج","خلية","عضو"], c:1},
        {q:"حالة ليست مادة؟", a:["صلبة","غازية","طاقة"], c:2}
    ],
    fun: [
        {q:"ما الذي يكبر بالأخذ؟", a:["العمر","الحفرة","المال"], c:1},
        {q:"يمشي بلا قدمين؟", a:["الوقت","السحاب","الصوت"], c:0},
        {q:"آخر حرف في الرياض؟", a:["ض","د","ا"], c:0},
        {q:"كم ثانية بالدقيقة؟", a:["60","90","100"], c:0},
        {q:"ما يُكسر بلا لمس؟", a:["الوعد","الزجاج","الصوت"], c:0}
    ],
    skills: [
        {q:"أهم مهارة قيادية؟", a:["التحكم","الاستماع","السرعة"], c:1},
        {q:"حل الخلاف؟", a:["حوار","تجاهل","انسحاب"], c:0},
        {q:"إدارة الوقت تعني؟", a:["تخطيط","سرعة","تأجيل"], c:0},
        {q:"العمل الجماعي؟", a:["فردية","تعاون","تنافس"], c:1},
        {q:"أول خطوة للحل؟", a:["الحل","الفهم","التنفيذ"], c:1}
    ]
};

function startSection(sec) {
    questions = data[sec];
    index = 0;
    score = 0;
    showPage("quiz");
    showQuestion();
}

function showQuestion() {
    let q = questions[index];
    document.getElementById("question").innerText = q.q;
    document.getElementById("progress").innerText = `سؤال ${index+1} من 5`;
    let opt = document.getElementById("options");
    opt.innerHTML = "";

    q.a.forEach((text, i) => {
        let b = document.createElement("button");
        b.innerText = text;
        b.onclick = () => answer(i, b);
        opt.appendChild(b);
    });
}

function answer(i, btn) {
    if (i === questions[index].c) {
        btn.classList.add("correct");
        correctSound.play();
        score++;
    } else {
        btn.classList.add("wrong");
        wrongSound.play();
    }

    setTimeout(() => {
        index++;
        if (index < questions.length) {
            showQuestion();
        } else {
            winSound.play();
            document.getElementById("question").innerText =
                `🏆 نتيجتك ${score} من 5`;
            document.getElementById("options").innerHTML =
                score >= 4 ? "🌟 أداء ممتاز!" : "💡 حاول مرة أخرى";
            document.getElementById("progress").innerText = "";
        }
    }, 800);
}

function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function goHome() { showPage("home"); }
function openTeacher() { showPage("teacher"); }

function suggestActivity() {
    let t = document.getElementById("timeInput").value;
    let r = document.getElementById("teacherResult");

    if (t <= 10) r.innerText = "⚡ مسابقة ترفيهية سريعة";
    else if (t <= 20) r.innerText = "🧠 تحدي ثقافي أو ديني";
    else r.innerText = "🏆 مسابقة كاملة مع نقاش جماعي";
}
