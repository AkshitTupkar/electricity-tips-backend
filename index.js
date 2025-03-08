const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

// Initialize the app
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// OpenAI API Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API Route
app.post('/generate-tips', async (req, res) => {
  const { electricityData } = req.body;

  try {
    const prompt = `Based on the electricity consumption data provided: ${electricityData}, provide 5 practical electricity conservation tips for a school.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    const tips = response.choices[0].message.content;
    res.send({ tips });
  } catch (error) {
    console.error('Error generating tips:', error);
    res.status(500).send('Error generating tips');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
