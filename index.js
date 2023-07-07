import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

const buildQuestionSnippet = (question, answer) => `
  <p>${question}</p>

  <label>
    Answer
    <input type="text" />
    <button hx-put='/answer?answer=${answer}'>Submit</button>
  </label>
`;

app.use(express.static('./public'));

app.get('/random', async (req, res) => {
  const response = await (await fetch('https://jservice.io/api/random')).json();
  //TODO: Clean the answer before  sending to snippet
  const questionSnippet = buildQuestionSnippet(response[0].question, response[0].answer);
  res.send(questionSnippet)
});

app.put('/answer', (req, res) => {
  const query = req.query;
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});