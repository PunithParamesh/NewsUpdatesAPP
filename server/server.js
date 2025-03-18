const express = require("express");
const cors = require("cors");
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static("public")); 

const API_KEY = process.env.MEDIASTACK_API_KEY; 

app.get("/api/news", async (req, res) => {
    try {
        const query = req.query.query || "india";
        const apiUrl = `http://api.mediastack.com/v1/news?access_key=${API_KEY}&keywords=${query}&languages=en`;

        const response = await fetch(apiUrl);

        console.log("Response Status:", response.status); // Log response status
        const textData = await response.text(); // Read raw response

        const data = JSON.parse(textData); // Convert to JSON manually
        res.json(data.data);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
