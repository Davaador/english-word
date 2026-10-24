let score = 0;
const name = "Bat";

function sayHello(name) {
    return `Hello, ${name}!`;
}

console.log(sayHello("Bat"));

const words1 = ["script", "array", "loop", "return", "console"];
console.log(words1[0]);
console.log(words1.length);

if(score > 3){
    console.log("You are a good student");
} else {
    console.log("You are a bad student");
}

for (let i = 0; i < words1.length; i++) {
    console.log(words1[i]);
}

function printCount(words) {
    return words.length;
}

console.log(printCount(words1));

const answer = document.getElementById("answer").value;
answer.trim().toLowerCase();