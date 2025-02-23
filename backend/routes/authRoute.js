const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).send("User already exists");

        user = new User({ name, email, password });
        await user.save();

        res.redirect("/login");
    } catch (error) {
        res.status(500).send("Server error");
    }
});

// Login Route
router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login"
}));

// Logout Route
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/login");
    });
});

module.exports = router;
