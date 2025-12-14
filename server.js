const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is live ✅");
});

app.post("/send-sos", async (req, res) => {
  try {
    const { location } = req.body;

    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: process.env.FAST2SMS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        route: "q",
        sender_id: "TXTIND",
        message: `🚨 SOS ALERT!\nI need help.\nLocation: ${location}`,
        language: "english",
        flash: 0,
        numbers: "8078416898"
      })
    });

    const data = await response.json();
    console.log("FAST2SMS RESPONSE:", data);

    res.json({
      success: true,
      fast2sms: data
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "SMS failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 SOS backend running on port ${PORT}`);
});
