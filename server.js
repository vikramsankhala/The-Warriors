const express = require('express');
const cors = require('cors');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const SYSTEM_PROMPT = `You are the AI Assistant for The Warriors — a nonprofit citizen self-empowerment club. Your role is to help users learn about:

- Self-defense techniques (effortless, physics-based — for women, children, seniors, disabled, the weak)
- Awareness and situational safety
- Weapon kits (basic, advanced, professional levels)
- Scenarios: being followed, grabbed from behind, home intrusion, etc.
- Philosophy: Redirect never resist, Contact points not force, Escape never fight
- Military Technologies (military-technologies.html): hypersonics, AI/C4ISR, directed energy, counter-drone, robotics, surveillance — for educational awareness

You draw from Aikido, Judo, Krav Maga, Systema, and Zen principles. Be supportive, clear, and practical. Remind users that techniques are for genuine self-defense only and to practice with qualified instructors. Keep responses concise and actionable.`;

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'AI assistant is not configured. Please set ANTHROPIC_API_KEY.' });
  }

  const { message, history = [] } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const messages = [
      ...history.slice(-10).map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      })),
      { role: 'user', content: message }
    ];

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages
    });

    const text = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('');

    res.json({ reply: text });
  } catch (err) {
    console.error('Anthropic API error:', err.message);
    res.status(500).json({
      error: err.message || 'Failed to get AI response. Please try again.'
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`The Warriors server running on port ${PORT}`);
});
