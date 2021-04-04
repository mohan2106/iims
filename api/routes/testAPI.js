var express = require("express");
var router = express.Router();
const admin = require("firebase-admin");

router.get("/", async function (req, res, next) {

    const db = admin.firestore();

    const docRef = db.collection("users").doc("alovelace2");

    await docRef.set({
        first: "Ada",
        last: "Lovelace",
        born: 1815,
    });

    res.send("API is working properly");
});
module.exports = router;
