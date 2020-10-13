const server = require("./server");
const UserRouter = require("./Routes/users-routes/user-routes");
const AuthRouter = require("./Routes/auth-routes/auth-route");

server.use("/users", UserRouter);
server.use("/auth", AuthRouter);

server.get("/", (req, res) => {
  res.status(200).json({ INDEX: "API WORKING" });
});
