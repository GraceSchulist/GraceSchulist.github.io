var quoteBtn = document.querySelector('#js-new-quote');
quoteBtn.addEventListener('click', getNumberTrivia);

var answerBtn = document.querySelector('#js-tweet');
answerBtn.addEventListener('click',() => {
    displayAnswer(current.answer);
    showReactionButtons();
});

var currentScore = 0;

var correctBtn = document.querySelector('#js-right-button');
correctBtn.addEventListener('click', () => {
    addScore();
    hideReactionButtons();
});

var incorrectBtn = document.querySelector('#js-wrong-button');
incorrectBtn.addEventListener('click', () => {
    subtractScore();
    hideReactionButtons();
});

var apiEndpoint = "https://opentdb.com/api.php?amount=1";

let current = {
    question: "",
    answer: ""
};

async function getNumberTrivia() {
    try {
      const response = await fetch('http://numbersapi.com/random/trivia?json');
      if (!response.ok) {
        throw Error(response.statusText);
      }
      
      const data = await response.json();
      console.log(data.text);

      current.question = "Question: " + cleanQuestion(data.text);

      current.answer = "Answer: " + data.number;

      displayQuote(current.question);
      displayAnswer("");
      hideReactionImage();
      hideReactionButtons();

    } catch (error) {
      console.error('Error fetching number trivia:', error);
    }
  }

// async function getQuote() {
//     try {
//         const response = await fetch(apiEndpoint);
//         if (!response.ok) {
//             throw Error(response.statusText);
//         } 
//         const json = await response.json();
//         // console.log(json);

//         displayQuote(json.question);
//         displayAnswer("");

//         current.question = json.question;
//         current.answer = json.answer;

//     } catch(err) {
//         // console.log(err);
//         alert('Fail');
//     }
// }

function displayQuote(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}

function displayAnswer(answer) {
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = answer;
}

function cleanQuestion(rawQuestion) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = rawQuestion;
    let decodedQuestion = textarea.value;

    decodedQuestion = decodedQuestion.replace(/^\d+[\.\)\:]?\s+/g, '______ ');
    
    return decodedQuestion;
}

function hideReactionButtons() {
    const correctBtn = document.querySelector('#js-right-button');
    const incorrectBtn = document.querySelector('#js-wrong-button');
    const reactionTxt = document.querySelector('#js-react-text');
    
    if (correctBtn) correctBtn.style.display = 'none';
    if (incorrectBtn) incorrectBtn.style.display = 'none';
    if (reactionTxt) reactionTxt.style.display = 'none';
}

function showReactionButtons() {
    const correctBtn = document.querySelector('#js-right-button');
    const incorrectBtn = document.querySelector('#js-wrong-button');
    const reactionTxt = document.querySelector('#js-react-text');
    
    if (correctBtn) correctBtn.style.display = 'block';
    if (incorrectBtn) incorrectBtn.style.display = 'block';
    if (reactionTxt) reactionTxt.style.display = 'block';
}

function addScore(){
    currentScore++;

    const scoreboard = document.querySelector('#score-value');
    scoreboard.textContent = currentScore;
}

function subtractScore() {
    currentScore--;

    const scoreboard = document.querySelector('#score-value');
    scoreboard.textContent = currentScore;

}

getNumberTrivia();
hideReactionButtons();