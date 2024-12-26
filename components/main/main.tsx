"use client";

import { useState } from "react";

export default function Main() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startSpeaking = () => {
    // Text-to-Speech
    const message = "Hi, how are you?";
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    // Once the speech ends, start listening
    utterance.onend = () => {
      console.log("Speech finished, starting microphone...");
      startListening();
    };

    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    // Check if the browser supports SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("SpeechRecognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Set language
    recognition.interimResults = false; // Only log final results
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Listening for user input...");
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript; // Extract transcript
      console.log("User said:", result);
      setTranscript(result);
    };

    recognition.onerror = (event) => {
      console.error("SpeechRecognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Stopped listening.");
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Thought Bubble Animation */}
      <div className="relative flex items-center justify-center h-40 w-40">
        <div className="absolute h-20 w-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute h-32 w-32 bg-white rounded-full animate-bounce"></div>
        <div className="absolute h-40 w-40 bg-white rounded-full"></div>
      </div>

      {/* Button Controls */}
      <div className="mt-8 flex space-x-4">
        <button
          onClick={startSpeaking}
          className="p-4 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          🎤
        </button>
      </div>

      {/* Display Transcription */}
      <div className="mt-4 text-gray-400">
        {isListening ? (
          <p>Listening...</p>
        ) : (
          <p>{transcript ? `You said: "${transcript}"` : "Press the button to start"}</p>
        )}
      </div>
    </div>
  );
}
