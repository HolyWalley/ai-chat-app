export async function onRequest(context) {
  try {
    const { request, env } = context;

    // Check if the method is POST
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    // Get the message from the request body
    const { message } = await request.json();

    // Generate the AI response
    const reply = await generateAIResponse(message, env.OPEN_AI_API_KEU);

    // Return the response as JSON
    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

// Function to call the OpenAI API
async function generateAIResponse(message, apiKey) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: message },
    ],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorDetails}`);
  }

  const data = await response.json();
  const aiMessage = data.choices[0].message.content.trim();
  return aiMessage;
}

