"use client";

import React, { useState } from "react";
import VoiceBubble from "@/components/VoiceBubble/voicebubble";

const SpeechHandler: React.FC = () => {
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
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

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

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript; // Extract transcript
      console.log("User said:", result);
      setTranscript(result);
    };

    recognition.onerror = (event: any) => {
      console.error("SpeechRecognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Stopped listening.");
    };

    recognition.start();
  };

  return (
    <div>
      <VoiceBubble onSpeak={startSpeaking} />
      {/* Display Transcription */}
      <div className="mt-4 text-center text-gray-400">
        {isListening ? (
          <p>Listening...</p>
        ) : (
          <p>{transcript ? `You said: "${transcript}"` : "Press the button to start"}</p>
        )}
      </div>
    </div>
  );
};

export default SpeechHandler;
