const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

// Initialize the app
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// OpenAI API Setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// API Route
app.post('/generate-tips', async (req, res) => {
  const { electricityData } = req.body;

  try {
    const prompt = `Based on the electricity consumption data provided: ${electricityData}, provide 5 practical electricity conservation tips for a school.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    const tips = response.data.choices[0].message.content;
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
