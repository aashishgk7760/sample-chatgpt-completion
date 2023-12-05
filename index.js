import OpenAI from "openai";
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();
const port = 3000;

let messageHistory = []; // Array to store message history

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  messageHistory.push({ role: 'user', content: message }); // Add user message to history

  try {
    const completion = await openai.chat.completions.create({
      messages: messageHistory,
      model: "gpt-3.5-turbo",
    });

    const botMessage = completion.choices[0].message.content;
    messageHistory.push({ role: 'assistant', content: botMessage }); // Add bot response to history

    res.json({ message: botMessage });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Error processing your request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// import OpenAI from "openai";
// import express from 'express';
// import cors from 'cors';
// import bodyParser from "body-parser";
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables from .env file

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Use your OpenAI API key from environment variables
// });

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(cors());

// app.post("/", async (req, res) => {
//   const { message } = req.body;

//   try {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "user", content: message }],
//       model: "gpt-3.5-turbo",
//     });

//     res.json({ message: completion.choices[0].message.content });
//   } catch (error) {
//     console.error('Error with OpenAI API:', error);
//     res.status(500).json({ error: 'Error processing your request' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
