const express = require("express");

const server = express();
const port = process.env.PORT || 8000;

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h1>Welcome</h1>`);
});

server.listen(port, () => {
  console.log(`Server has been initialized at http://localhost:${port}....`);
});
