const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/random", (req, res) => {
  const htmlSnippet = "<p>Random question</p>"
  res.send(htmlSnippet)
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});