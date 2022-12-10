/*const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/home.html"));
});

app.use(router);
app.listen(process.env.PORT || 3333, "0.0.0.0", () => {
    console.log("rodando.....")
});*/

const puppeteer = require("puppeteer");
//import puppeteer from 'puppeteer';




const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

router.get("/:username", (req, res) => {

    (async() => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(`https://www.instagram.com/${req.params.username}/?__a=1&__d=dis`);

        //Executado no puppeteer.Browser
        const imgList = await page.evaluate(() => {
            return document.getElementsByTagName('pre')[0].textContent;
            const nodeList = document.querySelectorAll('article img');
            const imgArray = [...nodeList];
            const imgList = imgArray.map(({ src }) => ({ src }));
            return imgList;
        });

        //await page.screenshot({ path: 'oi.png' });
        console.log(imgList);

        res.write('<html><head></head><body>');

        res.write(imgList);
        res.end('</body></html>');
        await browser.close();
    })();
    //res.sendFile(path.join(__dirname + "/pages/home.html"));
});

app.use(router);
app.listen(process.env.PORT || 3333, "0.0.0.0", () => {
    console.log("rodando.....")
});