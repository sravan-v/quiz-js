const start = document.getElementById('start');
const next = document.getElementById('next');
const questionContainer = document.getElementById('question-container');
const answersContainer = document.getElementById('answers-container');
const question = document.getElementById('question');
let filteredQuestions, currentQuestion;

start.addEventListener('click', startQuiz);
next.addEventListener('click', () => {
    if (next.innerHTML === 'Reset') {
        questionContainer.classList.add('hide');
        start.classList.remove('hide');
        next.classList.add('hide');
    }
    else {
        currentQuestion++;
        nextQuestion();
    }
})

function startQuiz() {
    next.innerHTML = 'Next';
    start.classList.add('hide');
    questionContainer.classList.remove('hide');
    filteredQuestions = questions.sort(() => Math.random() - .5);
    currentQuestion = 0;
    nextQuestion();
}

function nextQuestion() {
    resetQuestion();
    showQuestion(filteredQuestions[currentQuestion]);
}

function showQuestion(qstn) {
    question.innerHTML = qstn.question;
    qstn.answers.forEach(ans => {
        let btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerHTML = ans.option;
        if (ans.correct) {
            btn.dataset.correct = ans.correct;
        }
        btn.addEventListener('click', addAnswer);
        answersContainer.appendChild(btn);
    })
}

function resetQuestion() {
    // next.classList.add('hide');
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild)
    }
}

function addAnswer(e) {
    let selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    Array.from(answersContainer.children).map(button => {
        setButtonStatus(button, button.dataset.correct)
    })
    if (filteredQuestions.length > currentQuestion + 1) {
        next.classList.remove('hide')
    }
    else {
        next.innerHTML = 'Reset'
    }
}

function setButtonStatus(ele, correct) {
    cleatButtonStatus(ele)
    if (correct) {
        ele.classList.add('correct')
    }
    else {
        ele.classList.add('wrong')
    }
}

function cleatButtonStatus(ele) {
    ele.classList.remove('correct');
    ele.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 1 + 1?',
        answers: [
            { option: '4', correct: false },
            { option: '2', correct: true }
        ]
    },
    {
        question: 'What is 2 + 2?',
        answers: [
            { option: '4', correct: true },
            { option: '6', correct: false }
        ]
    }
];