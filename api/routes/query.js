var express = require("express");
var router = express.Router();
const { db } = require("../firebase");

router.post("/", async function (req, res) {
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

router.get("/", async function (req, res) {
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
            data.id = doc.id;
            console.log(data.id);
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
    res.send(queries);
});

router.get("/:queryID/answer", async function (req, res) {
    const document = await db
        .collection("query")
        .doc(req.params["queryID"])
        .get();
    let data = document.data();
    if (data !== undefined) {
        data.id = document.id;
    } else {
        data = {};
    }
    console.log(data);
    res.send(data);
});

router.post("/:queryID/answer", async function (req, res) {
    const docRef = db.collection("query").doc(req.params["queryID"]);
    console.log(req.url);
    console.log(req.body);
    await docRef
        .update({
            answer: req.body.answer,
        })
        .then(() => {
            res.send("Query Answered Successfully");
        })
        .catch((err) => {
            res.send(err);
        });
    // res.render("error", { title: "title", message: "message" });
});

module.exports = router;
