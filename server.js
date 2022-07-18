const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = process.env.PORT || 3001;
const routes = require("./routes")
const db = require("./config/connection")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
});