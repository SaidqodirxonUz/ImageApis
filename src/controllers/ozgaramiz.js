const express = require("express");
const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const apiCode = 20;

const mainUrl = process.env.mainUrl;

const pathURL = path.join(__dirname);

const ozgaramiz = async (req, res) => {
  try {
    const text = req.query.text || "RealCoderUz";

    console.log(pathURL);

    // Create a canvas
    const canvas = createCanvas(2000, 1414);
    const ctx = canvas.getContext("2d");

    // Load an image (you can replace the URL with your image URL)
    const image = await loadImage(
      path.join(__dirname, `../../img/img${apiCode}/photo.png`)
    );

    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Set font properties
    ctx.font = "150px ../../font/font.ttf";
    ctx.fillStyle = "#334166";

    // Draw the text on the canvas using the provided text parameter

    const olchamX = 840;
    const olchamY = 700;

    if (text.length >= 12) {
      ctx.fillText(text, olchamX - 300, olchamY);
      console.log("0iffda");
    }
    if (text.length === 10 || text.length === 11) {
      ctx.fillText(text, olchamX - 250, olchamY);
      console.log("iffda");
    }

    if (text.length === 9) {
      ctx.fillText(text, olchamX - 175, olchamY);
      console.log("iffffffda");
    }
    if (text.length === 6 || text.length === 7 || text.length === 8) {
      ctx.fillText(text, olchamX - 110, olchamY);
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

    res.setHeader("Content-Type", "text/html");
    res.send(`
    <title>O'zgaramiz</title>
    <center>    
    <img src="${mainUrl}/${apiCode}/goto.png" alt="Image with Text" />
    <br/>
    <br/>
    <p>Sizning rasmingiz</p>

    <button id="downloadButton" type="button">Yuklab Olish</button>
    
    </center>
    <script>
      // Add an event listener to the download button
      document.getElementById('downloadButton').addEventListener('click', function() {
        // Create a virtual link element
        var link = document.createElement('a');
        // Set the href attribute to the image URL
        link.href = '${mainUrl}/${apiCode}/goto.png';
        // Set the download attribute to specify the filename
        link.download = 'goto.png';
        // Append the link to the document
        document.body.appendChild(link);
        // Trigger a click on the link to start the download
        link.click();
        // Remove the link from the document
        document.body.removeChild(link);
      });
    </script>
  `);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  ozgaramiz,
};
