const questions = [
    {
        question: "Qual è l'animale più grande tra questi?",
        answers: [
            {text: 'Squalo',correct: false},
            {text: 'Giraffa',correct: false},
            {text: 'Balena blu',correct: true},
            {text: 'Elefante',correct: false},
        ]
    },
    {
        question: "Qual è il continente più piccolo?",
        answers: [
            {text: 'Asia',correct: false},
            {text: 'Australia',correct: true},
            {text: 'Africa',correct: false},
            {text: 'Artico',correct: false},
        ]
    },
    {
        question: "Qual è il deserto più grande al mondo?",
        answers: [
            {text: 'Kalahari',correct: false},
            {text: 'Gobi',correct: false},
            {text: 'Sahara',correct: false},
            {text: 'Antartica',correct: true},
        ]
    },
    {
        question: "Qual è lo stato più piccolo al mondo?",
        answers: [
            {text: 'Città del Vaticano',correct: true},
            {text: 'Bhutan',correct: false},
            {text: 'Nepal',correct: false},
            {text: 'Shri Lanka',correct: false},
        ]
    },
]


const questionElement = document.getElementById('question');
const answerBtn = document.getElementById('answer-bottons');
const nextBtn = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '.' + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const btn = document.createElement('button');
        btn.innerHTML = answer.text;
        btn.classList.add('btn');
        answerBtn.appendChild(btn); 
        if (answer.correct){
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener('click', selectAnswer)
    });
}

function resetState() { 
    nextBtn.style.display = 'none';
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
 }

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
    }
    //Anche se viene schiacciata sbagliata, evidenzia quella
    //corretta e rende non cliccabili le altre
    Array.from(answerBtn.children).forEach(btn =>{
        if (btn.dataset.correct === 'true'){
            btn.classList.add('correct');
        }
        btn.disabled = true;
        btn.style.cursor = 'no-drop';
    });
    nextBtn.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = 'Hai risposto correttamente a ' + score + '/' + questions.length + ' domande!'
    nextBtn.innerHTML = 'Play Again';
    nextBtn.style.display = 'block';
}

function handleNextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length) {
        handleNextBtn();
    } else{
        startQuiz();
    }
});

startQuiz();


btn.disabled = true;
