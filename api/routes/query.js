var express = require("express");
var router = express.Router();
const { db } = require("../firebase");

router.post("/post", async function (req, res, next) {
    const docRef = db.collection("query").doc();
    console.log(req.url);
    console.log(req.body);
    await docRef
        .set({
            user: req.body.username,
            category: req.body.category,
            query: req.body.query,
        })
        .then(() => {
            res.send("Query Posted Successfully");
        })
        .catch((err) => {
            res.send(err);
        });
});
module.exports = router;
