require("dotenv").config();
const app = require("./api/server.js");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`**Listening on port ${PORT}**`));