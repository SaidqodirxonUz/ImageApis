const express = require("express");
const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const apiCode = 6;

const mainUrl = process.env.mainUrl;

const pathURL = path.join(__dirname);

const api6 = async (req, res) => {
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
    ctx.font = "50px serif";
    ctx.fillStyle = "#3a4c40";

    // Draw the text on the canvas using the provided text parameter

    const olchamX = 260;
    const olchamY = 400;

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
      ctx.fillText(text, olchamX, olchamY);
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
    <title>New Year Api ${apiCode}</title>
    <center>    
    <img src="${mainUrl}/${apiCode}/goto.png" alt="Image with Text" />
    <br/>
    <br/>
    <p>Sizning rasmingiz</p>
    <p>Apidan foydalanish uchun 
    <br/> 
    <code>${mainUrl}/api/${apiCode}</code>   <br/> 
    ga GET sorivini jonatib 
    <br/> 
    <code>${mainUrl}/${apiCode}/goto.png </code>
    <br/> 
    orqali sorov jonatilganidan keyin 
    <br/> 
    yasalgan rasmni loyihangizda ham foydalanishingiz mumkin.</p>
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
  api6,
};
