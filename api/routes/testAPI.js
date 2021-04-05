var express = require("express");
var router = express.Router();
const { db } = require("../firebase");

router.post("/", async function (req, res, next) {
    const user = "Bhasker";
    const query = "Query 1";
    const docRef = db.collection("query").doc();
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

router.get("/", async function (req, res, next) {
    const queryRef = db.collection("query");
    const snapshot = await queryRef.get();
    var docs = [];
    snapshot.forEach((doc) => {
        docs.push(doc.data());
    });
    console.log(docs);
    res.send("API is working properly");
});
module.exports = router;
