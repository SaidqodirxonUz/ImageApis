const express = require("express");
const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const apiCode = 7;

const mainUrl = process.env.mainUrl;

const pathURL = path.join(__dirname);

const api7 = async (req, res) => {
  try {
    const text = req.query.text || "RealCoderUz";

    console.log(pathURL);

    // Create a canvas
    const canvas = createCanvas(640, 640);
    const ctx = canvas.getContext("2d");

    // Load an image (you can replace the URL with your image URL)
    const image = await loadImage(
      path.join(__dirname, `../../img/img${apiCode}/photo.jpg`)
    );

    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Set font properties
    ctx.font = "50px ../../font/font.ttf";
    ctx.fillStyle = "#013220";

    // Draw the text on the canvas using the provided text parameter

    const olchamX = 260;
    const olchamY = 370;

    if (text.length >= 12) {
      ctx.fillText(text, olchamX - 95, olchamY);
      console.log("0iffda");
    }
    if (text.length === 10 || text.length === 11) {
      ctx.fillText(text, olchamX - 75, olchamY);
      console.log("iffda");
    }

    if (text.length === 9) {
      ctx.fillText(text, olchamX - 50, olchamY);
      console.log("iffffffda");
    }
    if (text.length === 6 || text.length === 7 || text.length === 8) {
      ctx.fillText(text, olchamX - 30, olchamY);
      console.log("2 iffda");
    }

    if (text.length === 3 || text.length === 4 || text.length === 5) {
      ctx.fillText(text, olchamX, olchamY);
      console.log("3 iffda");
    }

    // Convert the canvas to a data URL
    const dataUrl = canvas.toDataURL();

    // Convert data URL to a buffer
    const buffer = Buffer.from(
      dataUrl.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    // Save the buffer as an image file
    fs.writeFileSync(
      path.join(__dirname, `../../public/${apiCode}/goto.png`),
      buffer,
      (err) => {
        if (err) {
          console.error("Error writing image file:", err);
          res.status(500).send("Internal Server Error");
          return;
        }
        console.log("File has been written");
      }
    );

    const resultImage = path.join(__dirname, "../../public/7/goto.png");

    res.sendFile(resultImage);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  api7,
};
