// ... existing code ...
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const elevenLabsApiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

// Example usage:
export async function sendMessage(message) {
  const response = await fetch(`${backendUrl}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Optionally send API key if needed (not recommended for secrets)
      // 'Authorization': `Bearer ${elevenLabsApiKey}`,
    },
    body: JSON.stringify({ message }),
  });
  return response.json();
}
// ... existing code ...