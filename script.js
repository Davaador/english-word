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
let words = localWords;

const API_URL = "https://words-api-1jvo.onrender.com/api/words"

async function loadWords() {
    try {
        const response = await fetch(API_URL);
        if(!response.ok){
            throw new Error("Server error: " + response.status);
        }
        words = await response.json();
        console.log("Loaded from API:", words.length);
        
    } catch (error) {
        console.log("API failed, using local words.", error);
    }
    index = Math.floor(Math.random() * words.length);
    question.textContent = words[index].mn; 
}

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