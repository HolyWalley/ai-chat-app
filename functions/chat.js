export async function onRequest(context) {
  const { request } = context;
  const { message } = await request.json();

  // Simulate AI response (replace with GPT-4o Mini logic if available)
  const reply = await generateAIResponse(message);

  return new Response(JSON.stringify({ reply }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function generateAIResponse(message) {
  // Placeholder for GPT-4o Mini integration
  return `Echo: ${message}`;
}

