# Setting Up a New Gemini API Key

This guide will help you set up a new API key for the Gemini AI model used in the Typni AI chatbot.

## Step 1: Create a Google AI Studio Account

1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Sign in with your Google account
3. Accept the terms of service if prompted

## Step 2: Generate a New API Key

1. In Google AI Studio, click on the "Get API key" button or navigate to [API Keys](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Give your API key a name (e.g., "Typni AI Chatbot")
4. Copy the generated API key (it will look something like "AIzaSyB...")

## Step 3: Add the API Key to Your Project

1. Open the `.env.local` file in your project root
2. Find or add the `GEMINI_API_KEY` variable
3. Set it to your new API key:
   ```
   GEMINI_API_KEY=your_new_api_key_here
   ```
4. Save the file

## Step 4: Restart Your Development Server

1. Stop your current development server (if running) by pressing `Ctrl+C` in the terminal
2. Start it again with:
   ```
   npm run dev
   ```

## Step 5: Test the Chatbot

1. Open your website in the browser
2. Click on the Typni AI chat button
3. Try sending a message to test if the API key is working correctly

## About Gemini Models

The Typni AI chatbot is configured to use the following Gemini models in order of preference:

1. **Gemini 2.0 Flash** - The newest and fastest model, optimized for quick responses
2. **Gemini 1.5 Flash** - A powerful model with strong reasoning capabilities

The system will automatically try each model in sequence until it finds one that works with your API key.

## API Format Compatibility

Our implementation handles the specific requirements of the Gemini API:

- The system uses the appropriate message format for each model
- For new conversations, the system prompt is included with the first user message
- For ongoing conversations, the context is maintained properly

## Fallback Mechanism

If all API endpoints fail, the chatbot will use pre-defined mock responses based on keywords in the user's message. This ensures that the chatbot remains functional even if there are temporary API issues.

## Troubleshooting

If you encounter issues:

1. **Check the API Key**: Make sure the API key is correctly copied without any extra spaces
2. **Check Console Logs**: Open your browser's developer tools (F12) and check the console for error messages
3. **API Quota**: Gemini API has usage limits. If you exceed them, you might need to wait or create a new key
4. **API Endpoints**: The chatbot tries multiple API endpoints. Check the server logs to see which one works

## Testing Your API Key Directly

You can test your API key directly using curl:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY" \
-H 'Content-Type: application/json' \
-X POST \
-d '{
  "contents": [{
    "role": "user",
    "parts":[{"text": "Hello, how are you?"}]
    }]
   }'
```

Replace `YOUR_API_KEY` with your actual API key.

## API Key Security

- Never commit your API key to version control
- Keep your `.env.local` file private
- If you suspect your API key has been compromised, generate a new one and delete the old one

For more information, visit the [Google AI Studio documentation](https://ai.google.dev/docs). 