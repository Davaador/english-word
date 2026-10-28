let score = 0;
let bestScore = Number(localStorage.getItem("bestScore")) || 0;
const bestText = document.getElementById("bestText");
bestText.textContent = "Best: " + bestScore;
const nextBtn = document.getElementById("nextbtn");
const previousBtn = document.getElementById("previousBtn");
const question = document.getElementById("question");
const answerInput = document.getElementById("answer");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");
const scoreText = document.getElementById("scoreText");
const resetBtn = document.getElementById("resetBtn");
let answered = false;
const history = [];
let allWords = localWords;   // бүх үг
let words = allWords;        // одоо сонгогдсон үгс
const categorySelect = document.getElementById("categorySelect");

// const API_URL = "https://words-api-1jvo.onrender.com/api/words"
const API_URL = "http://localhost:8080/api/words"


function fillCategories () {
    const categories = [...new Set(allWords.map(w => w.category).filter(Boolean))];
    categorySelect.innerHTML = '<option value="all">All</option>';
    categories.forEach(function(c) {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        categorySelect.appendChild(option);
    });
}

function showRandomWord() {
    index = Math.floor(Math.random() * words.length);
    question.textContent = words[index].mn;
    answerInput.value = "";
    result.textContent = "";
    answered = false;
    history.length = 0;
    
}

async function loadWords() {
    try {
        const response = await fetch(API_URL);
        if(!response.ok){
            throw new Error("Server error: " + response.status);
        }
        allWords = await response.json();
        
    } catch (error) {
        console.log("API failed, using local words.", error);
    }
    words = allWords;
    fillCategories();
    showRandomWord();
}

categorySelect.addEventListener("change", function () {
    const value = categorySelect.value;
    words = value === "all"
        ? allWords
        : allWords.filter(w => w.category === value);
    showRandomWord();
});

loadWords();

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
        if(score > bestScore) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore);
            bestText.textContent = "Best: " + bestScore;
        }
    } else {
        result.textContent = "Wrong. Answer: " + words[index].en;
        result.style.color = "red";

    }
    scoreText.textContent = "Score: " + score;
})

resetBtn.addEventListener("click", function() {
    bestScore = 0;
    localStorage.removeItem("bestScore");
    bestText.textContent = "Best: " + 0;
})

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}