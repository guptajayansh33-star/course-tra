const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files (including .well-known for TWA Android assetlinks)
app.use(express.static(path.join(__dirname, "public"), { dotfiles: "allow" }));

app.get("/.well-known/assetlinks.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.sendFile(path.join(__dirname, "public", ".well-known", "assetlinks.json"));
});


const users = [
    {
        username: process.env.USER1_USERNAME,
        password: process.env.USER1_PASSWORD
    },
    {
        username: process.env.USER2_USERNAME,
        password: process.env.USER2_PASSWORD
    },
    {
        username: process.env.USER3_USERNAME,
        password: process.env.USER3_PASSWORD
    },
    {
        username: process.env.USER4_USERNAME,
        password: process.env.USER4_PASSWORD
    },
    {
        username: process.env.USER5_USERNAME,
        password: process.env.USER5_PASSWORD
    },
    {
        username: process.env.USER6_USERNAME,
        password: process.env.USER6_PASSWORD
    },
    {
        username: process.env.USER7_USERNAME,
        password: process.env.USER7_PASSWORD
    },
    {
        username: process.env.USER8_USERNAME,
        password: process.env.USER8_PASSWORD
    },
    {
        username: process.env.USER9_USERNAME,
        password: process.env.USER9_PASSWORD
    },
    {
        username: process.env.USER10_USERNAME,
        password: process.env.USER10_PASSWORD
    }
];


// Login API
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    const user = users.find(
        (u) =>
            u.username === username &&
            u.password === password
    );

    if (user) {
        return res.json({
            success: true
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid username or password"
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Please close the other process or use a different port.`);
    } else {
        console.error("Server error:", err);
    }
    process.exit(1);
});