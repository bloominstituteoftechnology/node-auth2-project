//set up server object
const server = require('./api/server.js');

//set up ports
const PORT = process.env.PORT || 4000;

//listen to the server
server.listen(PORT, () => console.log(`\n===Running on localhost:${PORT}===\n`))