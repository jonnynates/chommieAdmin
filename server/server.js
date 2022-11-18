const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ kits: ["Exia", "Barbatos"] });
});

app.listen(5000, () => {console.log("Chommie Server started")})