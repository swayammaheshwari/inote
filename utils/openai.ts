import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the environment variable is set correctly
});

/**
 * Generate a chat completion response from OpenAI.
 * @param {string} prompt - The user input prompt.
 * @returns {Promise<string>} - The AI's response.
 */
async function getChatCompletion(prompt: string): Promise<string> {
  try {
    if (!prompt) {
      throw new Error('Prompt is required.');
    }

    const chatCompletion = await client.chat.completions.create({
      model: 'gpt-4', // Replace with your desired model (e.g., gpt-3.5-turbo, gpt-4)
      messages: [{ role: 'user', content: prompt }],
    });

    // Extract and return the AI's response content
    const aiResponse = chatCompletion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from the AI.');
    }

    return aiResponse.trim();
  } catch (error: any) {
    console.error('Error generating chat completion:', error.message);
    throw new Error(`OpenAI API Error: ${error.message}`);
  }
}

export default getChatCompletion;
