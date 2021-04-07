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
    const scoreboardDoc = db.collection("scoreboard");
    const snapshot = await scoreboardDoc.get();
    let scores = {};
    if (!snapshot.empty) {
        snapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            data.scores.forEach((element) => {
                if (scores.hasOwnProperty(element.college)) {
                    scores[element.college] =
                        scores[element.college] + element.score;
                } else {
                    scores[element.college] = element.score;
                }
            });
        });
    }
    console.log(scores);

    let scoreboard = [];
    for (let [k, v] of Object.entries(scores)) {
        scoreboard.push({
            college: k,
            score: v,
        });
    }

    scoreboard.sort((a, b) => b.score - a.score);
    scoreboard[0].rank = 1;
    for (let i = 1; i < scoreboard.length; ++i) {
        if (scoreboard[i].score < scoreboard[i - 1].score) {
            scoreboard[i].rank = scoreboard[i - 1].rank + 1;
        } else {
            scoreboard[i].rank = scoreboard[i - 1].rank;
        }
    }

    res.send({
        eventname: "All Events",
        scores: scoreboard,
    });
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
    let eventName = eventDoc.data().name;

    const scoreboardDoc = await db
        .collection("scoreboard")
        .doc(req.params["eventID"])
        .get();
    let scoreboard = scoreboardDoc.data();
    if (scoreboard !== undefined) {
        scoreboard = scoreboard.scores;
    } else {
        scoreboard = [];
    }
    console.log(scoreboard);
    scoreboard.sort((a, b) => b.score - a.score);
    scoreboard[0].rank = 1;
    for (let i = 1; i < scoreboard.length; ++i) {
        if (scoreboard[i].score < scoreboard[i - 1].score) {
            scoreboard[i].rank = scoreboard[i - 1].rank + 1;
        } else {
            scoreboard[i].rank = scoreboard[i - 1].rank;
        }
    }
    res.send({
        eventname: eventName,
        scores: scoreboard,
    });
});

router.patch("/:eventID/scoreboard", async function (req, res) {
    const docRef = db.collection("scoreboard").doc(req.params["eventID"]);
    await docRef
        .update(req.body)
        .then(() => {
            res.send("Scoreboard Updated Successfully");
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;
