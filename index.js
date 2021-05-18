require("dotenv").config();
const server = require('./api/server.js');
const {PORT} = require('./api/secrets')

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
