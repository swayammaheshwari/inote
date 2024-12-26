import React from "react";

interface VoiceBubbleProps {
  onSpeak: () => void;
}

const VoiceBubble: React.FC<VoiceBubbleProps> = ({ onSpeak }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Thought Bubble Animation */}
      <div className="relative flex items-center justify-center h-40 w-40">
        <div className="absolute h-20 w-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute h-32 w-32 bg-white rounded-full animate-bounce"></div>
        <div className="absolute h-40 w-40 bg-white rounded-full"></div>
      </div>

      {/* Button Controls */}
      <div className="mt-8">
        <button
          onClick={onSpeak}
          className="p-4 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          🎤
        </button>
      </div>
    </div>
  );
};

export default VoiceBubble;
