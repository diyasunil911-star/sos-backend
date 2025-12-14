const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

import fetch from "node-fetch";

app.post("/send-sos", async (req, res) => {
  try {
    const { location } = req.body;

    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        "authorization": process.env.FAST2SMS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        route: "q",
        message: `🚨 SOS ALERT!\nI need help.\nLocation: ${location}`,
        language: "english",
        flash: 0,
        numbers: "8078416898"
      })
    });

    const data = await response.json();
    console.log("SMS Response:", data);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "SMS failed" });
  }
});



// 🔴 PUT YOUR FAST2SMS API KEY HERE
const API_KEY = "jE2qDB6IKbJwNlhF4g8XzdSMmktHe5cPARZUv1a9pYuxyVLfCO3ZpfyDoQsBS976MiceNm2IVlbUu5XK";

// 🔴 PUT YOUR PHONE NUMBER HERE (10 digits only)
const CONTACT_NUMBERS = "8078416898";

app.get("/", (req, res) => {
  res.send("Backend is live ✅");
});


app.post("/send-sos", async (req, res) => {
  const { location } = req.body;

  const message = `🚨 SOS ALERT!
I need help.
My live location:
${location}`;

  await fetch("https://www.fast2sms.com/dev/bulkV2", {
    method: "POST",
    headers: {
      authorization: API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      route: "q",
      message,
      numbers: CONTACT_NUMBERS
    })
  });

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("🚀 SOS backend running on port 3000");
});
