import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are a creative writer helping generate crowdfunding campaign content for a parody crowdfunding site called "IndieFoFo". The campaigns should look and read like real crowdfunding campaigns on Kickstarter/Indiegogo — professional, compelling, and detailed — but the actual concepts should be funny, absurd, or creative based on the user's prompt.

Generate content that is entertaining and comedic while maintaining the structure and tone of a legitimate crowdfunding page. The humor should come from the concept itself and the deadpan delivery, not from breaking the fourth wall.

You MUST respond with valid JSON matching this exact structure (no markdown, no code fences, just raw JSON):
{
  "title": "string - catchy project title",
  "tagline": "string - one-line pitch, compelling and slightly absurd",
  "description": "string - 1-2 sentence elevator pitch",
  "story": "string - markdown formatted project story, 4-6 paragraphs with headers. Include: vision, what the project is, why it matters, what funding covers, and the team. Use ## and ### for headers.",
  "faq": [
    {"question": "string", "answer": "string"}
  ],
  "updates": [
    {"title": "string - update title", "content": "string - 2-3 sentences", "daysAgo": 3}
  ],
  "creatorName": "string - funny but believable name",
  "creatorBio": "string - 2-3 sentences, professional but with personality",
  "fundingGoal": 50000,
  "rewardTiers": [
    {"title": "string", "description": "string - what backer gets", "price": 10, "quantityAvailable": null, "estimatedDelivery": "string"},
    {"title": "string", "description": "string", "price": 25, "quantityAvailable": null, "estimatedDelivery": "string"},
    {"title": "string", "description": "string", "price": 50, "quantityAvailable": 500, "estimatedDelivery": "string"},
    {"title": "string", "description": "string", "price": 150, "quantityAvailable": 100, "estimatedDelivery": "string"},
    {"title": "string", "description": "string", "price": 500, "quantityAvailable": 20, "estimatedDelivery": "string"},
    {"title": "string", "description": "string", "price": 2500, "quantityAvailable": 5, "estimatedDelivery": "string"}
  ],
  "thumbnailDescription": "string - a short visual description for a thumbnail image (e.g., 'a gorilla in a courtroom wearing a suit'). This will be used for a placeholder image."
}

Include exactly 4-6 FAQ items and 3-4 updates. Make reward tier names and descriptions thematic and creative. The funding goal should feel realistic for the type of project described.`;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'A prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY environment variable is not set. Add it to your .env.local file.' },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Generate a crowdfunding campaign based on this idea: ${prompt}`,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    const generated = JSON.parse(jsonMatch[0]);

    return NextResponse.json(generated);
  } catch (error: unknown) {
    console.error('Generation error:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate campaign content';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
