const questions = [
    {
        question: "Что из предложенного НЕ является опасностью в сети?",
        optionA: "Травля в сети",
        optionB: "Фишинговые сайты",
        optionC: "Общение с друзьями",
        optionD: "Общение с незнакомцами",
        correctOption: "optionC"
    },

    {
        question: "Какие Настройки Приватности не позволят сетевому троллю испортить тебе настроение?",
        optionA: "Кто может писать мне личные сообщения: ВСЕ",
        optionB: "Кто может смотреть фотографии со мной: ТОЛЬКО ДРУЗЬЯ",
        optionC: "Кто может смотреть фотографии со мной: ВСЕ",
        optionD: "Кто может писать мне личные сообщения: ТОЛЬКО ДРУЗЬЯ",
        correctOption: "optionD"
    },

    {
        question: "Откуда НЕ стоит брать информацию в Интернете для реферата?",
        optionA: "Сайты средств массовой информации",
        optionB: "Википедия",
        optionC: "Электронные библиотеки",
        optionD: "Сообщества в социальных сетях",
        correctOption: "optionD"
    },

    {
        question: "Что такое фишинг в сети?",
        optionA: "Онлайн-игра про ловлю рыбы",
        optionB: "Вид мошенничества",
        optionC: "Рекламные сообщения на тему рыбалки",
        optionD: "Навязчивая реклама в сети",
        correctOption: "optionB"
    },

    {
        question: "Что НЕ следует делать, если ты столкнулся с троллем в Сети?",
        optionA: "Игнорировать выпады тролля",
        optionB: "Заблокировать тролля",
        optionC: "Проучить или доказать свою правоту",
        optionD: "Сообщить модераторам сайта",
        correctOption: "optionC"
    },

    {
        question: "Какой из паролей является надёжным?",
        optionA: "Alex2001",
        optionB: "19032001",
        optionC: "12345678",
        optionD: "Vbif20hjvfyjd01",
        correctOption: "optionD"
    },

    {
        question: "Как НЕ стоит себя вести, если вы стали жертвой кибербуллинга?",
        optionA: "Ничего не делать",
        optionB: "Заблокировать обидчиков",
        optionC: "Сообщить родителям (взрослым)",
        optionD: "Обратиться на Линию помощи «Дети онлайн»",
        correctOption: "optionA"
    },

    {
        question: "Какую информацию о себе можно выкладывать в Интернете в открытом доступе?",
        optionA: "Место работы родителей",
        optionB: "Номер телефона",
        optionC: "Домашний адрес",
        optionD: "О своих интересах",
        correctOption: "optionD"
    },

    {
        question: "С кем нужно быть осторожным при общении в интернете?",
        optionA: "Родственники",
        optionB: "Интернет-хамы",
        optionC: "Друзья",
        optionD: "Одноклассники",
        correctOption: "optionB"
    },

    {
        question: "Что не относится к сайтам?",
        optionA: "История браузера",
        optionB: "Социальная сеть",
        optionC: "Вики",
        optionD: "Поисковик",
        correctOption: "optionA"
    }

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}