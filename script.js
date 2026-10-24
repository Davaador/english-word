let score = 0;
const words = [
    // 1-р өдөр
    { en: "tag", mn: "шошго" },
    { en: "page", mn: "хуудас" },
    { en: "button", mn: "товч" },
    { en: "file", mn: "файл" },
    { en: "browser", mn: "хөтөч" },

    // 2-р өдөр
    { en: "style", mn: "загвар" },
    { en: "color", mn: "өнгө" },
    { en: "margin", mn: "гаднах зай" },
    { en: "padding", mn: "доторх зай" },
    { en: "selector", mn: "сонгогч" },

    // 3-р өдөр
    { en: "script", mn: "скрипт" },
    { en: "array", mn: "массив" },
    { en: "loop", mn: "давталт" },
    { en: "return", mn: "буцаах" },
    { en: "console", mn: "консол" },

    // 4-р өдөр
    { en: "element", mn: "элемент" },
    { en: "event", mn: "үйл явдал" },
    { en: "click", mn: "дарах" },
    { en: "object", mn: "объект" },
    { en: "index", mn: "индекс" },

    // 4-р өдөр: алдаа
    { en: "null", mn: "хоосон" },
    { en: "error", mn: "алдаа" },
    { en: "property", mn: "шинж чанар" },
    { en: "missing", mn: "дутуу" },
    { en: "typo", mn: "үсгийн алдаа" },

    // 4-р өдөр: Previous
    { en: "previous", mn: "өмнөх" },
    { en: "limit", mn: "хязгаар" },
    { en: "skip", mn: "алгасах" },
    { en: "condition", mn: "нөхцөл" },
    { en: "loop around", mn: "эргэлдэх" },

    // 5-р өдөр
    { en: "answer", mn: "хариулт" },
    { en: "question", mn: "асуулт" },
    { en: "correct", mn: "зөв" },
    { en: "wrong", mn: "буруу" },
    { en: "score", mn: "оноо" },

    // 5-р өдөр: төлөв
    { en: "state", mn: "төлөв" },
    { en: "guard", mn: "хамгаалалт" },
    { en: "dead code", mn: "ашиглагдаагүй код" },
    { en: "clean", mn: "цэвэр" },
    { en: "duplicate", mn: "давхардал" },

    // 6-р өдөр
    { en: "deploy", mn: "байршуулах" },
    { en: "commit", mn: "хадгалалт" },
    { en: "repository", mn: "хадгалах сан" },
    { en: "install", mn: "суулгах" },
    { en: "offline", mn: "интернэтгүй" },

    //ugluunii dasgal
    {en: "server", mn: "Сервер"},
    {en: "request", mn: "Хүсэлт"},
    {en: "response", mn: "Хариу"},
    {en: "database", mn: "Өгөгдлийн сан"},
    {en: "data", mn: "Өгөгдөл"},

    //5-р өдөр нэмэлт
    {en: "list", mn: "Жагсаалт"},
    {en: "replace", mn: "Солих"},
    {en: "random", mn: "Санаандгүй"},
    {en: "duplicate", mn: "Давхардал"},
    {en: "collect", mn: "Цуглуулах"},
    {en: "history", mn: "Түүх"},
    {en: "repeat", mn:"давтах"},
    {en: "pop", mn: "гаргаж авах"}
];
let index = Math.floor(Math.random() * words.length);
const nextBtn = document.getElementById("nextbtn");
const previousBtn = document.getElementById("previousBtn");
const question = document.getElementById("question");
const answerInput = document.getElementById("answer");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");
const scoreText = document.getElementById("scoreText");
question.textContent = words[index].mn;
let answered = false;
const history = [];

function randomIndex() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * words.length);
    } while (newIndex === index);
    return newIndex;
}

nextBtn.addEventListener("click", function() {
    history.push(index);
    index = randomIndex();
    // if(index >= words.length) {
    //     index = 0;
    // }
    question.textContent = words[index].mn;
    answerInput.value = "";
    result.textContent = "";
    answered = false;

});

previousBtn.addEventListener("click", function(){
    
    if (history.length === 0) {
        return;   // буцах үг байхгүй
    }
    index = history.pop();
    question.textContent = words[index].mn;
    answerInput.value = "";
    result.textContent = "";
    answered = false;
})

checkBtn.addEventListener("click", function(){
    if (answered) {
        return;   // аль хэдийн шалгасан бол зогс
    }
    answered = true;
    const answer = answerInput.value.trim().toLowerCase();
    if(answer === words[index].en) {
        result.textContent = "Correct!";
        result.style.color = "green";
        score++;
    } else {
        result.textContent = "Wrong. Answer: " + words[index].en;
        result.style.color = "red";

    }
    scoreText.textContent = "Score: " + score;
})

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}