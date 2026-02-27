'use client';

import { useState } from 'react';
import { levels, Level, getTotalLevels } from '@/lib/levels';

interface GameState {
  currentLevel: number;
  completedLevels: number[];
  totalScore: number;
}

interface PlayResult {
  aiOutput: string;
  passed: boolean;
  feedback: string;
  tip: string | null;
}

export default function Game() {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    completedLevels: [],
    totalScore: 0,
  });
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PlayResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const currentLevelData: Level | undefined = levels.find(
    (l) => l.id === gameState.currentLevel
  );

  const handleSubmit = async () => {
    if (!userPrompt.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);
    setAttempts((prev) => prev + 1);

    try {
      const response = await fetch('/api/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          levelId: gameState.currentLevel,
          userPrompt: userPrompt.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);

        if (data.passed && !gameState.completedLevels.includes(gameState.currentLevel)) {
          const pointsEarned = Math.max(100 - (attempts * 10), 50);
          setGameState((prev) => ({
            ...prev,
            completedLevels: [...prev.completedLevels, prev.currentLevel],
            totalScore: prev.totalScore + pointsEarned,
          }));
        }
      } else {
        setResult({
          aiOutput: '',
          passed: false,
          feedback: data.error || 'Something went wrong',
          tip: 'Please try again',
        });
      }
    } catch {
      setResult({
        aiOutput: '',
        passed: false,
        feedback: 'Failed to connect to the server',
        tip: 'Check your connection and try again',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextLevel = () => {
    if (gameState.currentLevel < getTotalLevels()) {
      setGameState((prev) => ({
        ...prev,
        currentLevel: prev.currentLevel + 1,
      }));
      setUserPrompt('');
      setResult(null);
      setShowHint(false);
      setAttempts(0);
    }
  };

  const handleSelectLevel = (levelId: number) => {
    setGameState((prev) => ({ ...prev, currentLevel: levelId }));
    setUserPrompt('');
    setResult(null);
    setShowHint(false);
    setAttempts(0);
  };

  const isGameComplete = gameState.completedLevels.length === getTotalLevels();

  if (isGameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-lg text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">
            Quest Complete!
          </h1>
          <p className="text-2xl text-white mb-6">
            Final Score: <span className="text-yellow-400 font-bold">{gameState.totalScore}</span>
          </p>
          <p className="text-gray-300 mb-8">
            You've mastered all 8 prompt engineering techniques. You're now a Prompt Quest Champion!
          </p>
          <button
            onClick={() => {
              setGameState({ currentLevel: 1, completedLevels: [], totalScore: 0 });
              setUserPrompt('');
              setResult(null);
              setAttempts(0);
            }}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Header */}
      <header className="p-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-yellow-400">Prompt</span>Quest
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">
              Score: <span className="text-yellow-400 font-bold">{gameState.totalScore}</span>
            </span>
            <span className="text-gray-300">
              Level: <span className="text-white font-bold">{gameState.currentLevel}/{getTotalLevels()}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Level Selector */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex gap-2 flex-wrap mb-6">
          {levels.map((level) => {
            const isCompleted = gameState.completedLevels.includes(level.id);
            const isCurrent = gameState.currentLevel === level.id;
            return (
              <button
                key={level.id}
                onClick={() => handleSelectLevel(level.id)}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  isCurrent
                    ? 'bg-yellow-500 text-black scale-110'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {isCompleted ? '✓' : level.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Game Area */}
      <main className="max-w-4xl mx-auto p-4">
        {currentLevelData && (
          <div className="space-y-6">
            {/* Level Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full">
                  {currentLevelData.concept}
                </span>
                <h2 className="text-2xl font-bold text-white">
                  Level {currentLevelData.id}: {currentLevelData.title}
                </h2>
              </div>

              <p className="text-gray-300 mb-4">{currentLevelData.description}</p>

              <div className="bg-black/30 rounded-xl p-4">
                <h3 className="text-yellow-400 font-bold mb-2">Your Challenge:</h3>
                <p className="text-white">{currentLevelData.challenge}</p>
              </div>

              {/* Hint Section */}
              <div className="mt-4">
                {!showHint ? (
                  <button
                    onClick={() => setShowHint(true)}
                    className="text-yellow-400 hover:text-yellow-300 text-sm underline"
                  >
                    Need a hint?
                  </button>
                ) : (
                  <div className="bg-yellow-500/20 rounded-lg p-3">
                    <p className="text-yellow-200 text-sm">
                      <span className="font-bold">Hint:</span> {currentLevelData.hint}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <label className="block text-white font-bold mb-3">
                Your Prompt:
              </label>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Type your prompt here..."
                className="w-full h-32 bg-black/30 text-white rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500"
                disabled={isLoading}
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-400 text-sm">
                  Attempts: {attempts}
                </span>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !userPrompt.trim()}
                  className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⚡</span>
                      Testing...
                    </>
                  ) : (
                    <>Send Prompt</>
                  )}
                </button>
              </div>
            </div>

            {/* Result */}
            {result && (
              <div
                className={`rounded-2xl p-6 ${
                  result.passed
                    ? 'bg-green-500/20 border-2 border-green-500'
                    : 'bg-red-500/20 border-2 border-red-500'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{result.passed ? '🎉' : '💡'}</span>
                  <h3 className={`text-xl font-bold ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                    {result.passed ? 'Challenge Passed!' : 'Not Quite...'}
                  </h3>
                </div>

                {result.aiOutput && (
                  <div className="bg-black/30 rounded-xl p-4 mb-4">
                    <h4 className="text-gray-400 text-sm mb-2">AI Response:</h4>
                    <p className="text-white whitespace-pre-wrap">{result.aiOutput}</p>
                  </div>
                )}

                <p className="text-white mb-4">{result.feedback}</p>

                {result.tip && (
                  <p className="text-yellow-300 text-sm">
                    <span className="font-bold">Tip:</span> {result.tip}
                  </p>
                )}

                {result.passed && gameState.currentLevel < getTotalLevels() && (
                  <button
                    onClick={handleNextLevel}
                    className="mt-4 bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-lg transition-colors"
                  >
                    Next Level →
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500 text-sm mt-8">
        Learn prompt engineering by playing. Built for AI Build Sprint Week 3.
      </footer>
    </div>
  );
}
