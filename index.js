const { PORT } = require("./config");

const server = require('./api/server.js');

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
