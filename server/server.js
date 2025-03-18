const express = require("express");
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
        const apiUrl = `http://api.mediastack.com/v1/news?access_key=${API_KEY}&keywords=${query}&languages=en`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        res.json(data.data); // Send only the `data` array
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});


app.use(express.static("public"));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
