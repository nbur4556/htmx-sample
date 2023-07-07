import bodyParser from 'body-parser';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

const buildQuestionSnippet = (question, answer) => `
  <p>${question}</p>

  <form hx-patch='/answer'>
    <input name="guess" type="text" />
    <input name="answer" type="text" value="${answer}" hidden />
    <button type="submit">Submit</button>
  </form>
`;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/random', async (req, res) => {
  const response = await (await fetch('https://jservice.io/api/random')).json();
  //TODO: Clean the answer before  sending to snippet
  const questionSnippet = buildQuestionSnippet(response[0].question, response[0].answer);
  res.send(questionSnippet)
});

app.patch('/answer', (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});