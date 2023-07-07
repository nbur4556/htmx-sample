import bodyParser from 'body-parser';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

let questionsTotal = 0;
let questionsCorrect = 0;

const buildQuestionSnippet = (question, answer) => `
  <p>${question}</p>

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

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/random', async (req, res) => {
  const response = await (await fetch('https://jservice.io/api/random')).json();
  questionsTotal++;
  //TODO: Clean the answer before  sending to snippet
  const questionSnippet = buildQuestionSnippet(response[0].question, response[0].answer);
  res.send(questionSnippet)
});

app.patch('/answer', (req, res) => {
  const guess = req.body.guess;
  const answer = req.body.answer;
  const message = (guess === answer) ? "Correct" :  "Incorrect"

  if (guess === answer) {
    questionsCorrect ++;
  }

  //TODO: Clean the guess before comparison
  const scoreSnippet = buildScoreSnippet(message);
  res.send(scoreSnippet);
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});