import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getLevel } from '@/lib/levels';

export async function POST(request: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const { levelId, userPrompt } = await request.json();

    if (!levelId || !userPrompt) {
      return NextResponse.json(
        { error: 'Missing levelId or userPrompt' },
        { status: 400 }
      );
    }

    const level = getLevel(levelId);
    if (!level) {
      return NextResponse.json(
        { error: 'Invalid level' },
        { status: 400 }
      );
    }

    // Step 1: Execute the user's prompt to get AI response
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    const aiResult = await model.generateContent(userPrompt);
    const aiOutput = aiResult.response.text();

    // Step 2: Judge whether the response meets the success criteria
    const judgeModel = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      generationConfig: { responseMimeType: 'application/json' },
    });

    const judgePrompt = `You are a judge in a prompt engineering game. Your job is to determine if an AI's response meets the success criteria for a challenge.

Be fair but not overly strict. If the response reasonably meets the criteria, it passes.

CHALLENGE: ${level.challenge}

SUCCESS CRITERIA: ${level.successCriteria}

USER'S PROMPT: ${userPrompt}

AI'S RESPONSE: ${aiOutput}

Did the AI's response meet the success criteria? Respond in JSON format:
{
  "passed": true or false,
  "feedback": "Brief explanation of why it passed or failed",
  "tip": "A helpful tip for improving their prompt (only if they failed, otherwise null)"
}`;

    const judgeResult = await judgeModel.generateContent(judgePrompt);
    const judgmentText = judgeResult.response.text();

    let judgment;
    try {
      judgment = JSON.parse(judgmentText);
    } catch {
      judgment = { passed: false, feedback: 'Error parsing judgment', tip: 'Try again' };
    }

    return NextResponse.json({
      aiOutput,
      passed: judgment.passed,
      feedback: judgment.feedback,
      tip: judgment.tip || null,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
