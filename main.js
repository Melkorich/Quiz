// all answer options
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');

//all our options
const optionElements = document.querySelectorAll('.option');

//сам вопрос
const question = document.getElementById('question');

//номер вопроса
const numberOfQuestion = document.getElementById('number-of-question');

//количество всех вопросов
const numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion; //index текущего вопроса
let indexOfPage = 0; //index страницы

const answersTracker = document.getElementById('answers-tracker'); //обертка для трекера

//кнопка далее
const btnNext = document.getElementById('btn-next');

let score = 0; //итоговый результат викторины

//кол-во правильных ответов
const correctAnswer = document.getElementById('correct-answer');

//кол-во всех вопросов в модальном окне
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2');

//кнопка попробовать снова
const btnTryAgain = document.getElementById('btn-try-again');

const questions = [{
    question: 'Как правильно учить JavaScript?',
    options: [
      'никак',
      'молча',
      'проходить курсы, читать, смотреть ютуб и практиковаться!',
      'что такое JavaScript?',
    ],
    rightAnswer: 2
  },
  {
    question: '5 + 5 = ?',
    options: [
      '10',
      'я не умею считать',
      '25',
      'error',
    ],
    rightAnswer: 0
  },
  {
    question: 'Python > Js',
    options: [
      'Не понял',
      'извинись',
      'Js > Python',
      'да да я',
    ],
    rightAnswer: 2
  }
]

numberOfAllQuestions.innerHTML = questions.length; //выводим кол-во вопросов

const load = function () {
  question.innerHTML = questions[indexOfQuestion].question; //обращаемся к самому вопросу

  //мапим ответы
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы

  indexOfPage++; //увеличение индекса страницы
};

let completedAnswers = []; //массив для уже заданных вопросов

//генерируем рандомный вопрос
const randomQuestion = function () {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false; //якорь для проверки одинаковых вопросов

  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach(item => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate == true) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
}

const checkAnswer = el => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add('correct');
    updateAnswerTracker('correct');
    score++;
  } else {
    el.target.classList.add('wrong');
    updateAnswerTracker('wrong');
  }
  disabledOptions();
}

for (option of optionElements) {
  option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = function () {
  optionElements.forEach(item => {
    item.classList.add('disabled');
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add('correct');
    }
  });
}

//удаление всех классов со всех ответов
const inableOptions = function () {
  optionElements.forEach(item => {
    item.classList.remove('disabled', 'correct', 'wrong');
  })
};

const answerTracker = function () {
  questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
  })
}

const updateAnswerTracker = function (status) {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = function () {
  if (!optionElements[0].classList.contains('disabled')) {
    alert('вам нужно выбрать вариант ответа');
  } else {
    randomQuestion();
    inableOptions();
  }
}

const quizOver = function () {
  document.querySelector('.quiz-over-modal').classList.add('active');
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = function () {
  window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', function () {
  validate();
})

window.addEventListener('load', function () {
  randomQuestion();
  answerTracker();
});