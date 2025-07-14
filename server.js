const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.MEDIASTACK_API_KEY;

app.use(cors());
app.use(express.json()); 

app.get("/api/news", async (req, res) => {
    try {
        const query = req.query.query || "india";
        const apiUrl = `https://api.mediastack.com/v1/news?access_key=${API_KEY}&keywords=${query}&languages=en`;

        //console.log("Mediastack API URL:", apiUrl);
        const response = await fetch(apiUrl);

        const rawText = await response.text();
        //console.log("Mediastack Raw Response:", rawText);

        if (!response.ok) {
            console.error("Mediastack responded with status", response.status);
            return res.status(500).json({ error: "Failed to fetch from Mediastack" });
        }

        const data = JSON.parse(rawText);

        if (!data || !Array.isArray(data.data)) {
            console.error("Unexpected Mediastack response structure:", data);
            return res.status(500).json({ error: "Invalid data structure from Mediastack" });
        }

        res.json(data.data);
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).json({ error: "Server error fetching news" });
    }
});

app.use(express.static(path.join(__dirname, "public")));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
