import { NextRequest, NextResponse } from 'next/server';

// Mock responses only as a last resort
const MOCK_RESPONSES = {
  default: "I'm here to help you learn about TYPNI and navigate our website. What would you like to know?",
  hello: "Hello! Welcome to TYPNI. I'm Typni AI, here to help you navigate our website and learn about our organization. How can I assist you today?",
  events: "You can find information about our upcoming events on the Events page. We regularly host workshops, seminars, and community gatherings to support youth development.",
  donate: "Thank you for your interest in supporting TYPNI! You can make donations through our Donate page, where you'll find various ways to contribute to our mission.",
  contact: "You can reach out to the TYPNI team through our Contact page. We're always happy to hear from you and answer any questions you might have.",
  programs: "TYPNI offers various programs focused on youth empowerment, leadership development, and community action. Check out our Programs page for detailed information.",
  membership: "We'd love to have you join TYPNI! Visit our Membership page to learn about membership benefits and how to become part of our global network.",
  about: "TYPNI is a global network empowering young people to create positive change through collaboration, leadership, and community action. Learn more on our About page.",
  thanks: "You're welcome! If you have any more questions about TYPNI, feel free to ask. We're here to help!",
  blog: "Our blog features articles about youth empowerment, leadership, and community action. Check it out to stay updated on TYPNI's initiatives and success stories.",
  partners: "TYPNI collaborates with various organizations that share our vision for youth empowerment. Visit our Partners page to learn about these collaborations.",
  help: "I can help you navigate the TYPNI website and provide information about our programs, events, membership, and more. What would you like to know?",
};

// Function to get a mock response based on keywords in the message
function getMockResponse(message: string): string {
  const lowerCaseMessage = message.toLowerCase();
  
  if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
    return MOCK_RESPONSES.hello;
  } else if (lowerCaseMessage.includes('event') || lowerCaseMessage.includes('calendar')) {
    return MOCK_RESPONSES.events;
  } else if (lowerCaseMessage.includes('donate') || lowerCaseMessage.includes('support')) {
    return MOCK_RESPONSES.donate;
  } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('reach')) {
    return MOCK_RESPONSES.contact;
  } else if (lowerCaseMessage.includes('program') || lowerCaseMessage.includes('initiative')) {
    return MOCK_RESPONSES.programs;
  } else if (lowerCaseMessage.includes('join') || lowerCaseMessage.includes('member')) {
    return MOCK_RESPONSES.membership;
  } else if (lowerCaseMessage.includes('about') || lowerCaseMessage.includes('mission')) {
    return MOCK_RESPONSES.about;
  } else if (lowerCaseMessage.includes('thank')) {
    return MOCK_RESPONSES.thanks;
  } else if (lowerCaseMessage.includes('blog') || lowerCaseMessage.includes('article')) {
    return MOCK_RESPONSES.blog;
  } else if (lowerCaseMessage.includes('partner') || lowerCaseMessage.includes('collaboration')) {
    return MOCK_RESPONSES.partners;
  } else if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('assist')) {
    return MOCK_RESPONSES.help;
  }
  
  return MOCK_RESPONSES.default;
}

// System prompt that defines the chatbot's behavior
const SYSTEM_PROMPT = `You are Typni AI, a helpful assistant for The Young Peoples' Network International (TYPNI).
                    
About TYPNI:
- TYPNI stands for The Young Peoples' Network International
- It is a global network empowering young people to create positive change through collaboration, leadership, and community action
- TYPNI focuses on youth empowerment, leadership, community action, education, and social change

Website Sections:
- Home: Main landing page with overview of TYPNI
- About: Information about TYPNI's mission, vision, and team
- Events: Calendar of upcoming events and activities
- Blog: Articles and news about TYPNI initiatives
- Programs: Educational and development programs offered by TYPNI
- Partners: Organizations collaborating with TYPNI
- Membership: Information about joining TYPNI
- Donate: Ways to support TYPNI financially
- Contact: How to get in touch with TYPNI
- Profile: For registered users to manage their account
- Admin: For administrators to manage the website (restricted access)

Features:
- User registration and login
- Event calendar and registration
- Blog posts and articles
- Program information and enrollment
- Donation options
- Membership management
- Chat functionality
- Polls and surveys

Your goal is to provide helpful, accurate information about TYPNI's programs, events, initiatives, and how to navigate the website.
Be friendly, concise, and informative. If you don't know the answer to a specific question, acknowledge that and suggest where the user might find that information on the website.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format. Message must be a non-empty string.' },
        { status: 400 }
      );
    }
    
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    
    // If no API key is provided, return an error message
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured in environment variables. Please add your API key to .env.local file.' },
        { status: 500 }
      );
    }

    // Try different API endpoints in order, starting with the newest model
    const apiEndpoints = [
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent',
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent'
    ];
    
    let responseText = null;
    let apiError = null;
    
    // Prepare conversation history for the API
    // Convert from our format to Gemini API format
    const conversationHistory = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    // Add the current message
    const userMessage = {
      role: 'user',
      parts: [{ text: message }]
    };
    
    // Add the current message
    const contents = [
      // If there's no history, include the system prompt with the first user message
      ...(conversationHistory.length === 0 ? [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_PROMPT}\n\nUser query: ${message}` }]
        }
      ] : [
        // Otherwise just add the user message to the existing conversation
        ...conversationHistory,
        userMessage
      ])
    ];
    
    // Try each endpoint until one works
    for (const apiUrl of apiEndpoints) {
      try {
        console.log(`Trying Gemini API endpoint: ${apiUrl}`);
        
        const response = await fetch(`${apiUrl}?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Gemini API error with ${apiUrl}:`, response.status, errorText);
          apiError = new Error(`Gemini API error: ${response.status}`);
          continue; // Try the next endpoint
        }

        const data = await response.json();
        
        // Extract the response text from Gemini API response
        responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!responseText) {
          console.error('Empty response from Gemini API:', data);
          apiError = new Error('Received empty response from AI service');
          continue; // Try the next endpoint
        }
        
        console.log(`Successfully got response from ${apiUrl}`);
        break; // We got a valid response, exit the loop
      } catch (error) {
        console.error(`Error with endpoint ${apiUrl}:`, error);
        apiError = error;
        // Continue to the next endpoint
      }
    }
    
    if (responseText) {
      return NextResponse.json({ response: responseText });
    } else {
      // If all API endpoints failed, try to use mock responses as a last resort
      const mockResponse = getMockResponse(message);
      console.log('Using mock response as fallback');
      
      return NextResponse.json({ 
        response: mockResponse,
        warning: 'Using mock response due to API failure'
      });
    }
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
} 