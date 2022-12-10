const puppeteer = require("puppeteer");
const bot = async(req) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true
    });
    const page = await browser.newPage();

    await page.goto(`https://www.instagram.com/${req.params.username}/?__a=1&__d=dis`);

    const imgList = await page.evaluate(() => {
        return document.getElementsByTagName('pre')[0].textContent;
        const nodeList = document.querySelectorAll('article img');
        const imgArray = [...nodeList];
        const imgList = imgArray.map(({ src }) => ({ src }));
        return imgList;
    });
    await browser.close();
    return imgList;

};

module.exports = bot;