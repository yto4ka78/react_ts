import express from "express";
import path from "path";
import apiRouter from "../routes/index";
const app = express();

app.use("/api", apiRouter);
app.use(express.static(path.join(__dirname, "../../../client/build/")));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../../client/build/", "index.html"));
});

export default app;
