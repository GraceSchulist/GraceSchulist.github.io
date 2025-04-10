var quoteBtn = document.querySelector('#js-new-quote');
quoteBtn.addEventListener('click', getQuote);

var answerBtn = document.querySelector('#js-tweet');
answerBtn.addEventListener('click',() => displayAnswer(current.answer));

var apiEndpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

let current = {
    question: "",
    answer: ""
};

async function getQuote() {
    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        } 
        const json = await response.json();
        // console.log(json);
        displayQuote(json.question);
        displayAnswer("");

        current.question = json.question;
        current.answer = json.answer;

    } catch(err) {
        // console.log(err);
        alert('Fail');
    }
}

function displayQuote(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}

function displayAnswer(answer) {
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = answer;
}

getQuote();