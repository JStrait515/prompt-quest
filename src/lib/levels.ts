export interface Level {
  id: number;
  title: string;
  concept: string;
  description: string;
  challenge: string;
  hint: string;
  successCriteria: string;
  exampleGoodPrompt: string;
}

export const levels: Level[] = [
  {
    id: 1,
    title: "Be Specific",
    concept: "Specificity",
    description: "Vague prompts get vague answers. The more specific you are, the better the AI understands what you want.",
    challenge: "Get the AI to describe a strawberry, but you can't use the word 'strawberry' in your prompt. The AI must clearly be talking about a strawberry.",
    hint: "Think about what makes a strawberry unique - its color, shape, texture, where it grows...",
    successCriteria: "The AI's response clearly describes a strawberry with specific details like red color, small seeds on the outside, sweet taste, or heart shape.",
    exampleGoodPrompt: "Describe a small, red, heart-shaped fruit that has tiny seeds on its outer surface and grows close to the ground on a plant."
  },
  {
    id: 2,
    title: "Set Constraints",
    concept: "Constraints",
    description: "Constraints focus the AI's creativity. By setting limits, you often get more interesting and useful outputs.",
    challenge: "Get the AI to write a story about a robot, but the story must be EXACTLY 3 sentences long. Not 2, not 4 - exactly 3.",
    hint: "Be explicit about the constraint. Don't just mention it - make it a clear rule.",
    successCriteria: "The AI produces a coherent story about a robot that is exactly 3 sentences long.",
    exampleGoodPrompt: "Write a story about a robot. The story must be exactly 3 sentences long - no more, no less."
  },
  {
    id: 3,
    title: "Assign a Role",
    concept: "Role-Playing",
    description: "When you give the AI a persona or role, it adapts its knowledge, tone, and perspective to match.",
    challenge: "Get the AI to explain how to make a sandwich, but it must respond as a dramatic Shakespearean actor.",
    hint: "Tell the AI WHO it should be before telling it WHAT to do.",
    successCriteria: "The AI explains sandwich-making using Shakespearean language (thee, thou, hark, etc.) with dramatic flair.",
    exampleGoodPrompt: "You are a dramatic Shakespearean actor performing a monologue. Explain how to make a sandwich in your theatrical style."
  },
  {
    id: 4,
    title: "Give Examples",
    concept: "Few-Shot Learning",
    description: "Showing the AI examples of what you want is often clearer than explaining it. This is called 'few-shot' prompting.",
    challenge: "Teach the AI that 'flurbo' means 'fantastic'. Then get it to use 'flurbo' correctly in a sentence about the weather.",
    hint: "Show the AI a few examples of how 'flurbo' is used before asking it to use the word.",
    successCriteria: "The AI correctly uses 'flurbo' to mean 'fantastic' in a weather-related sentence.",
    exampleGoodPrompt: "Learn this new word: 'flurbo' means 'fantastic'. Examples: 'This pizza is flurbo!' 'What a flurbo day!' Now write a sentence about the weather using 'flurbo'."
  },
  {
    id: 5,
    title: "Think Step by Step",
    concept: "Chain-of-Thought",
    description: "For complex problems, asking the AI to think step-by-step produces better reasoning and fewer errors.",
    challenge: "Get the AI to solve this: 'A farmer has 15 apples. He gives 1/3 to his neighbor, then buys 7 more. How many does he have?' The AI must show its work.",
    hint: "Ask the AI to break down the problem and show each step of its reasoning.",
    successCriteria: "The AI shows the calculation steps (15 ÷ 3 = 5, 15 - 5 = 10, 10 + 7 = 17) and arrives at 17 apples.",
    exampleGoodPrompt: "Solve this step by step, showing your work: A farmer has 15 apples. He gives 1/3 to his neighbor, then buys 7 more. How many does he have?"
  },
  {
    id: 6,
    title: "Format Your Output",
    concept: "Output Formatting",
    description: "You can control exactly how the AI structures its response by specifying the format you want.",
    challenge: "Get the AI to list 3 benefits of exercise. The output must be in a numbered list with each benefit in ALL CAPS.",
    hint: "Be explicit about the format - numbered list AND all caps. Show what you expect.",
    successCriteria: "The AI outputs exactly 3 numbered items about exercise benefits, with the benefits written in all capital letters.",
    exampleGoodPrompt: "List 3 benefits of exercise. Format: numbered list (1, 2, 3) with each benefit in ALL CAPS."
  },
  {
    id: 7,
    title: "Provide Context",
    concept: "Context Setting",
    description: "The AI doesn't know your situation unless you tell it. More context leads to more relevant responses.",
    challenge: "You're a vegetarian planning a dinner party for 4 people, one of whom is allergic to nuts. Get the AI to suggest a main course that works for everyone.",
    hint: "Include ALL the relevant constraints in your prompt - don't make the AI guess.",
    successCriteria: "The AI suggests a vegetarian, nut-free main course suitable for 4 people.",
    exampleGoodPrompt: "I'm a vegetarian hosting a dinner party for 4 people. One guest has a nut allergy. Suggest a main course that everyone can eat."
  },
  {
    id: 8,
    title: "Iterate and Refine",
    concept: "Prompt Iteration",
    description: "Great prompts often come from refining initial attempts. Don't expect perfection on the first try.",
    challenge: "Get the AI to write a haiku (5-7-5 syllables) about coding. It must be a valid haiku with the correct syllable count.",
    hint: "If the first attempt isn't right, tell the AI what to fix. Be specific about the syllable requirement.",
    successCriteria: "The AI produces a haiku about coding with exactly 5 syllables in line 1, 7 in line 2, and 5 in line 3.",
    exampleGoodPrompt: "Write a haiku about coding. Remember: line 1 has 5 syllables, line 2 has 7 syllables, line 3 has 5 syllables. Count carefully."
  }
];

export function getLevel(id: number): Level | undefined {
  return levels.find(level => level.id === id);
}

export function getTotalLevels(): number {
  return levels.length;
}
