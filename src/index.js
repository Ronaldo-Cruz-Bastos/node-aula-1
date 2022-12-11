const express = require("express");
const bot = require("./bot");

const path = require("path");
const app = express();
const router = express.Router();
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/home.html"));
});

router.get("/chromium", (req, res) => {
    const chromium = require('chromium');
    const { execFile } = require('child_process');

    execFile(chromium.path, ['https://google.com'], err => {
        console.log('Hello Google!');
    });
    res.sendFile(path.join(__dirname + "/pages/home.html"));
});

router.get("/:username", async(req, res) => {
    const response = await bot(req);
    res.write('<html><head></head><body>');

    res.write(response);
    res.end('</body></html>');

    //res.sendFile(path.join(__dirname + "/pages/home.html"));
});

app.use(router);
// app.listen(process.env.PORT || 3000, function() {
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });
app.listen(process.env.PORT || 3333, "0.0.0.0", () => {
    console.log("rodando.....")
});