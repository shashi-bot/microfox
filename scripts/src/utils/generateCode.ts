import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? '',
});

export async function generateCode(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a senior software engineer who generates complete code.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
    });

    const code = response.choices[0].message.content.trim();
    return code;
  } catch (error: any) {
    console.error('OpenAI API error:', error.message || error);
    process.exit(1);
  }
  return '';
}
