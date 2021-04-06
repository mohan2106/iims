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
    const docRef = db.collection("event").doc();
    await docRef
        .set({
            name: req.body.name,
            date: new Date(req.body.date),
            venue: req.body.venue,
            description: req.body.description,
            colleges: req.body.colleges,
        })
        .then(() => {
            res.send("Event Created Successfully");
        })
        .catch((err) => {
            res.send("error");
            res.send(err);
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

module.exports = router;
