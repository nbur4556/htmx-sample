import bodyParser from 'body-parser';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

let questionsTotal = 0;
let questionsCorrect = 0;

const buildQuestionSnippet = (question, answer) => `
  <p>${question}</p>

  <p>Answer in the form of a question...</p>
  <form hx-patch='/answer' hx-target=".score" hx-swap="outerHtml">
    <label>What is <input name="guess" type="text" /></label>
    <input name="answer" type="text" value="${answer}" hidden />
    <button type="submit">Submit</button>
  </form>
`;

const buildScoreSnippet = (message) => `
  <p>Score: ${questionsCorrect}/${questionsTotal}</p>
  <p>${message}</p>
`

const cleanAnswer = (answer) => {
  const cleanedAnswer = answer.replace(/[^\w\s]/g, "").replace(/\s+/g, "");
  const lowercaseAnswer = cleanedAnswer.toLowerCase();
  return lowercaseAnswer;
}

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/random', async (req, res) => {
  const response = await (await fetch('https://jservice.io/api/random')).json();
  const question = response[0].question;
  const answer = cleanAnswer(response[0].answer);
  questionsTotal++;

  const questionSnippet = buildQuestionSnippet(question, answer);
  res.send(questionSnippet)
});

app.patch('/answer', (req, res) => {
  const guess = cleanAnswer(req.body.guess);
  const answer = req.body.answer;
  const message = (guess === answer) ? "Correct" :  `Incorrect (answer: ${answer})`

  if (guess === answer) {
    questionsCorrect ++;
  }

  const scoreSnippet = buildScoreSnippet(message);
  res.send(scoreSnippet);
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});