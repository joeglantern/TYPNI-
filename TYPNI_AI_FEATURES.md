# Typni AI Chatbot Features

The Typni AI chatbot is a powerful tool designed to help users navigate the TYPNI website and learn about the organization. This document outlines the features and capabilities of the chatbot.

## Core Features

### 1. Gemini AI Integration

The chatbot uses Google's Gemini AI models to provide intelligent, context-aware responses:

- **Gemini 2.0 Flash**: The newest and fastest model, optimized for quick responses
- **Gemini Pro**: A powerful model with strong reasoning capabilities
- **Automatic Fallback**: The system tries multiple API endpoints to ensure reliability

### 2. Conversation Memory

- **Persistent Chat History**: Conversations are saved in the browser's local storage, allowing users to continue conversations even after closing and reopening the website
- **Context-Aware Responses**: The chatbot remembers previous messages in the conversation, providing more relevant and coherent responses

### 3. Voice Input

- **Speech Recognition**: Users can speak to the chatbot instead of typing
- **Voice Toggle**: Easy-to-use microphone button to start and stop voice input
- **Real-time Transcription**: Voice is converted to text in real-time

### 4. Export Functionality

- **Download Conversations**: Users can export their entire conversation history as a text file
- **Timestamped Files**: Exported files include a timestamp in the filename for easy organization

### 5. User Experience Enhancements

- **Typing Indicator**: A natural-feeling typing animation when the chatbot is generating a response
- **Smooth Animations**: Polished animations for messages and UI elements
- **Responsive Design**: Works well on both desktop and mobile devices
- **Error Handling**: Clear error messages and recovery options if something goes wrong

## How to Use the Chatbot

1. **Open the Chat**: Click the chat button in the bottom-right corner of the screen
2. **Type or Speak**: Enter your message by typing or using the voice input feature
3. **View Responses**: The chatbot will respond with helpful information about TYPNI
4. **Continue Conversations**: Your conversation history is saved automatically
5. **Export if Needed**: Use the download button to save your conversation

## Technical Details

The Typni AI chatbot is built using:

- **Next.js**: For the frontend framework
- **Google Gemini API**: For the AI language model
- **Local Storage**: For persisting conversations
- **Web Speech API**: For voice recognition
- **Framer Motion**: For smooth animations

## Troubleshooting

If you encounter issues with the chatbot:

1. **Check Your Internet Connection**: The chatbot requires an internet connection to communicate with the AI service
2. **Refresh the Page**: If the chatbot becomes unresponsive, try refreshing the page
3. **Clear Browser Data**: If persistent issues occur, try clearing your browser's local storage
4. **Check API Status**: The chatbot relies on Google's Gemini API, which may occasionally experience downtime

## Privacy Considerations

- Conversations are stored only in your browser's local storage and are not sent to any server except when communicating with the Gemini API
- Voice data is processed locally and only the resulting text is sent to the API
- No personal information is collected or stored by the chatbot

## Future Enhancements

The Typni AI chatbot is continuously being improved. Planned future enhancements include:

- Integration with TYPNI's event calendar and membership database
- Multi-language support
- Customizable chat interface
- Advanced analytics for administrators 