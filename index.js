const server = require("./api/server");

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server has been initialized at http://localhost:${port}....`);
});
