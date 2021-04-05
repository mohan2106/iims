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
    res.send("API is working properly");
});

router.get("/get", async function (req, res, next) {
    const queryRef = db.collection("query");
    let snapshot;
    if (req.query.category === "All") {
        snapshot = await queryRef.get();
    } else {
        snapshot = await queryRef
            .where("category", "==", req.query.category)
            .get();
    }
    let queries = [];
    if (!snapshot.empty) {
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (req.query.type !== undefined) {
                if (req.query.type === "Answered") {
                    if (data.answer !== undefined && data.answer.length > 0) {
                        queries.push(data);
                    }
                } else if (req.query.type === "Unanswered") {
                    if (data.answer === undefined || data.answer.length === 0) {
                        queries.push(data);
                    }
                } else {
                    queries.push(data);
                }
            } else {
                queries.push(data);
            }
        });
    }
    console.log(queries);
    res.send("API is working properly");
});
module.exports = router;
