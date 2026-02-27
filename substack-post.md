# I Built a Game That Teaches You to Talk to AI

### Week 3 of AI Build Sprint — turning prompt engineering into something you actually want to learn

---

Most people struggle with AI not because the models are bad, but because they don't know how to ask.

I wanted to fix that — not with a tutorial, not with a blog post, but with a game.

**PromptQuest** is an 8-level challenge where you learn prompt engineering by doing it. Each level teaches one technique:

- Be specific (vague prompts get vague answers)
- Set constraints to focus creativity
- Assign a role for better responses
- Give examples — aka few-shot prompting
- Think step by step for complex problems
- Format your output exactly how you need it
- Provide context so the AI understands your situation
- Iterate and refine until it's right

You write a prompt, the AI executes it, and a second AI judges whether you nailed the challenge. Pass and you move on. Fail and you get a tip to improve.

The whole thing runs on the Gemini API and took about a day to build with Next.js.

**What I learned:** The hardest part wasn't the code — it was designing challenges that are simple enough to understand but specific enough to actually teach something. Level 1 (describe a strawberry without saying "strawberry") sounds trivial. It's not.

This week had a great theme for this kind of build. Kyle Sebeysten took a similar angle with LinkLevel (https://substack.com/home/post/p-189372130) — paste in any article URL and it turns the content into an interactive quiz with boss battles and a procedural map. Two people, same week, same idea that learning sticks better when it feels like a game.

Play PromptQuest: https://prompt-quest-delta.vercel.app

Code: https://github.com/JStrait515/prompt-quest

Built for AI Build Sprint Week 3: Interactive AI Tutorials.
