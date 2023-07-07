import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.static('./public'));

app.get('/random', async (req, res) => {
  const response = await (await fetch('https://jservice.io/api/random')).json();
  console.log(response);

  const htmlSnippet = `
    <p>${response[0].question}</p>
    <label>
      Answer
      <input type="text" />
      <button data-answer="${response[0].answer}">Submit</button>
    </label>
  `
  res.send(htmlSnippet)
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});