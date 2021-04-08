var express = require("express");
var router = express.Router();
const { db } = require("../firebase");

router.get("/", async function (req, res) {
    const eventRef = db.collection("event");
    const snapshot = await eventRef.get();
    let events = [];
    if (!snapshot.empty) {
        snapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            events.push(data);
        });
    }
    res.send(events);
});

router.post("/", async function (req, res) {
    const eventRef = db.collection("event").doc();
    const scoreboardRef = db.collection("scoreboard").doc(eventRef.id);
    await eventRef
        .set(req.body)
        .then(async () => {
            scores = [];
            req.body.participatingCollege.forEach((college) => {
                scores.push({
                    college: college,
                    score: 0,
                });
            });
            await scoreboardRef
                .set({
                    scores: scores,
                })
                .then(() => {
                    res.send("Event Created Successfully");
                })
                .catch((err) => {
                    res.send(err);
                });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get("/scoreboard", async function (req, res) {
    const scoreboardDoc = db.collection("event");
    const snapshot = await scoreboardDoc.get();
    let scores = {};
    if (!snapshot.empty) {
        snapshot.forEach((doc) => {
            let data = doc.data();
            console.log(data);
            console.log(data.hasOwnProperty("scores"));
            for (let i = 0; i < data.participatingCollege.length; ++i) {
                if (scores.hasOwnProperty(data.participatingCollege[i])) {
                    if (data.hasOwnProperty("scores")) {
                        scores[data.participatingCollege[i]] += data.scores[i];
                    }
                } else {
                    if (data.hasOwnProperty("scores")) {
                        scores[data.participatingCollege[i]] = data.scores[i];
                    } else {
                        scores[data.participatingCollege[i]] = 0;
                    }
                }
            }
            console.log(scores);
        });
    }

    let scoreboard = [];
    for (let [k, v] of Object.entries(scores)) {
        scoreboard.push({
            college: k,
            score: v,
        });
    }

    res.send(scoreboard);
});

router.get("/:eventID", async function (req, res) {
    const document = await db
        .collection("event")
        .doc(req.params["eventID"])
        .get();
    let data = document.data();
    if (data !== undefined) {
        data.id = document.id;
    } else {
        data = {};
    }
    res.send(data);
});

router.patch("/:eventID", async function (req, res) {
    const docRef = db.collection("event").doc(req.params["eventID"]);
    await docRef
        .update(req.body)
        .then(() => {
            res.send("Event Updated Successfully");
        })
        .catch((err) => {
            res.send(err);
        });
});

router.delete("/:eventID", async function (req, res) {
    const docRef = db.collection("event").doc(req.params["eventID"]);
    docRef
        .delete()
        .then(() => {
            res.send("Event Deleted Successfully");
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get("/:eventID/scoreboard", async function (req, res) {
    const eventDoc = await db
        .collection("event")
        .doc(req.params["eventID"])
        .get();
    let data = eventDoc.data();
    let scoreboard = [];
    for (let i = 0; i < data.participatingCollege.length; ++i) {
        scoreboard.push({
            college: data.participatingCollege[i],
            score: data.hasOwnProperty("scores") ? data.scores[i] : 0,
        });
    }
    res.send(scoreboard);
});

router.patch("/:eventID/scoreboard", async function (req, res) {
    const docRef = db.collection("event").doc(req.params["eventID"]);
    const participatingCollege = req.body.participatingCollege;
    const scores = req.body.scores;

    await docRef
        .update({
            participatingCollege: participatingCollege,
            scores: scores,
        })
        .then(() => {
            res.send("Scoreboard Updated Successfully");
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;
