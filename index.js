const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { configDotenv } = require("dotenv");
configDotenv();

//

const apis = require("./src/routes/newYearApi");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

const mainUrl = process.env.mainUrl;
const PORT = process.env.PORT;

// Get the absolute path to the "img" directory
const imgPath = path.join(__dirname, "public");

console.log(imgPath);

// Serve the "img" directory as a static folder
app.use(express.static(imgPath));

app.get("/", async (req, res) => {
  res.send(`<h1>Barcha Apilar ${mainUrl}/api/1 dan 10 gacha </a> </h1>`);
});

app.use("/api/newyear", apis);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
