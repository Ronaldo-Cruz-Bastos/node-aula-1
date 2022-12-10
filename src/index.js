const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/home.html"));
});

app.use(router);
app.listen(process.env.PORT || 3333, "0.0.0.0", () => {
    console.log("rodando.....")
});