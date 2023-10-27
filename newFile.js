const { globalMiddleware } = require("./src/middlewares/middleware");
const { app } = require("./server");

app.use(globalMiddleware);
