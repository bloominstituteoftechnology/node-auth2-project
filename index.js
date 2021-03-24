require("dotenv").config();
const server = require("./API/server");
const PORT = process.env.PORT || 4991;

server.listen(PORT, () => {
  console.log(`Port is running on port: ${PORT}`);
});
