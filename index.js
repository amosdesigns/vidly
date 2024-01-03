//const dotenv = require( "dotenv" );
const serverSettings = {};
require("dotenv").config({ processEnv: serverSettings });

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routers
const home = require("./routers/home");
const genres = require("./routers/genres");
const e = require("express");
app.use("/", home);
app.use("/api/genres", genres);

// server configurations
let PORT = parseInt(serverSettings.DEV_PORT);

if (serverSettings.STATUS === "production") {
  PORT = parseInt(serverSettings.PROD_PORT);
} else {
  PORT = 80;
}
// app configurations
app.set("PORT", PORT);

app.listen(PORT, () =>
  console.log(`http://Vidly.com  - Server running on Port ${PORT}`)
);
