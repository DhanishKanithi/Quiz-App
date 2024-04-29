const questions = [
    {
        question : "What is the name of the largest star in the universe ? " ,
        answers : [
            { text : "AH Scorpii" , correct :  false },
            { text : "UY Scuti", correct : true} , 
            { text : "61 Cygni", corrext : false},
            { text : "Red Dwarfs" , correct : false}
        ]

    },
    {
        question : "What is the name of smallest country in the world ? " ,
        answers : [
            { text : "Monaco" , correct :  false },
            { text : "Nauru", correct : false} , 
            { text : "Vactican City", correct : true},
            { text : "Tuvalu" , correct : false}
        ]

    },
    {
        question : "What is the name of the deepest ocean trench ? " ,
        answers : [
            { text : "Challenger Deep" , correct :  true },
            { text : "Galathea Depth", correct : false} , 
            { text : "Kuril-Kamchatka Trench", corrext : false},
            { text : "Tonga Trench" , correct : false}
        ]

    },
    {
        question : "What is the name of the tallest mountain in the world ? " ,
        answers : [
            { text : "Mount Everest" , correct :  true },
            { text : "Kangchenjunga", correct : false} , 
            { text : "Lhotse", corrext : false},
            { text : "K2" , correct : false}
        ]

    },
    {
        question : "What is the name of the fastest animal in the world ? " ,
        answers : [
            { text : "Golden Eagle" , correct :  false },
            { text : "Black Marlin", correct : false} , 
            { text : "White-throated Needletail Swift", corrext : false},
            { text : "Peregrine Falcon" , correct : true}
        ]

    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next" ;
    showQuestion();
}
function showQuestion()
{
    resetState();
    let currentQuestion = questions[currentQuestionIndex] ;
    let questionNo = currentQuestionIndex + 1 ;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question ;

    currentQuestion.answers.forEach(answer=> {
        const button = document.createElement("button") ;
        button.innerHTML = answer.text ;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct)
        {
            button.dataset.correct = answer.correct ;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState() 
{
    nextButton.style.display = "none" ;
    while(answerButton.firstChild)
    {
        answerButton.removeChild(answerButton.firstChild); 
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target ;
    const isCorrect = selectedBtn.dataset.correct === "true" ;
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else
    {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = true ;
    });
    nextButton.style.display = "block" ;
}

function showScore()
{
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}....` ;
    nextButton.innerHTML = "Play Again" ;
    nextButton.style.display = "block" ;
}

function handleNextButton()
{
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
}
nextButton.addEventListener("click", ()=>
{
    if (currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();