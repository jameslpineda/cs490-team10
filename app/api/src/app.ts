import express from "express";

const { run, client } = require("./lib/db");

const app = express();
const port = 3000;

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log("Server listening on port 3000");
});
