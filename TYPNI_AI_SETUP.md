# Typni AI Setup Guide

This guide will help you set up the Typni AI chatbot powered by Google's Gemini API.

## Prerequisites

- A Google account
- Access to Google AI Studio (https://makersuite.google.com/)

## Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/)
2. Sign in with your Google account
3. Navigate to the "Get API key" section
4. Create a new API key or use an existing one
5. Copy the API key for the next step

## Setting Up Environment Variables

1. Open your project's `.env.local` file
2. Add the following line, replacing `your_gemini_api_key_here` with your actual API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Save the file
4. Restart your development server if it's running

## How the Typni AI Chatbot Works

The Typni AI chatbot is implemented with the following components:

1. **API Route**: `/app/api/chat/route.ts` handles communication with the Gemini API
2. **UI Component**: `/components/TypniAI.tsx` provides the chat interface
3. **Integration**: The chatbot is integrated into the main layout in `app/client-layout.tsx`

## Customizing the Chatbot

You can customize the chatbot by:

1. **Modifying the prompt**: Edit the system prompt in `/app/api/chat/route.ts` to change how the AI responds
2. **Styling**: Update the UI component in `/components/TypniAI.tsx` to match your design preferences
3. **Behavior**: Adjust the API parameters in `/app/api/chat/route.ts` to control the AI's response style

## Limitations

- The free tier of Gemini API has rate limits. Check the [Google AI documentation](https://ai.google.dev/docs/rate_limits) for details.
- The chatbot doesn't maintain conversation history on the server side, only in the client's browser session.

## Troubleshooting

If you encounter issues:

1. Check that your API key is correctly set in the `.env.local` file
2. Ensure your API key has the necessary permissions
3. Check the browser console and server logs for error messages
4. Verify your internet connection as the chatbot requires API calls to Google's servers

## Additional Resources

- [Gemini API Documentation](https://ai.google.dev/docs/gemini_api_overview)
- [Google AI Studio](https://makersuite.google.com/) 