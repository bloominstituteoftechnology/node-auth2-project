
require("dotenv").config();
const server = require("./api/server.js");

const PORT = process.env.PORT;

!PORT || PORT === undefined
  ? console.log("ERROR: Cannot find port")
  : server.listen(PORT, () => {
      console.log(`\n***🚀 API Running on Port: ${PORT} 🚀***\n`);
    });