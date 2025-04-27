"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [text, setText] = useState(
    'The happy dog is not terribly sad or of melancholy, he\'s is just a cheerful fellow full of joy and absolutely no sorrow <script>alert("Hello, this is an alert from TypeScript!")</script>'
  );

  // Words to highlight and their corresponding classes and messages
  const wordMap = {
    happy: [
      { word: "happy", message: "Feeling or showing pleasure or contentment" },
      { word: "joy", message: "A feeling of great pleasure and happiness" },
      { word: "delight", message: "Great pleasure or satisfaction" },
      { word: "cheerful", message: "Noticeably happy and optimistic" },
      { word: "glad", message: "Feeling pleasure or happiness" },
      {
        word: "pleased",
        message: "Feeling or showing pleasure and satisfaction",
      },
    ],
    sad: [
      { word: "sad", message: "Feeling or showing sorrow; unhappy" },
      { word: "unhappy", message: "Not happy; feeling or showing sadness" },
      {
        word: "depressed",
        message: "In a state of general unhappiness or despondency",
      },
      { word: "gloomy", message: "Feeling or looking sad or depressed" },
      {
        word: "sorrow",
        message:
          "A feeling of deep distress caused by loss, disappointment, or other misfortune",
      },
      {
        word: "melancholy",
        message:
          "A feeling of pensive sadness, typically with no obvious cause",
      },
    ],
  };

  const highlightWords = (text: string) => {
    // Split the text into words while preserving spaces and punctuation
    const words = text.split(/(\s+)/);

    // Process each word
    const processedWords = words.map((word) => {
      // Skip processing for whitespace
      if (/^\s+$/.test(word)) return word;

      // Check if the word matches any of our target words
      const matchedWord = [...wordMap.happy, ...wordMap.sad].find(
        ({ word: targetWord }) =>
          word.toLowerCase() === targetWord.toLowerCase()
      );

      if (matchedWord) {
        const isHappy = wordMap.happy.some(
          ({ word }) => word.toLowerCase() === matchedWord.word.toLowerCase()
        );
        const emotionClass = isHappy ? styles.happy : styles.sad;

        return `
          <span class="${styles.highlight} ${emotionClass}">
            ${word}
            <span class="${styles.dropdown}">${matchedWord.message}</span>
          </span>
        `;
      }

      return word;
    });

    return processedWords.join("");
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Text Highlighter</h1>
        <textarea
          id="textInput"
          className={styles.textInput}
          placeholder="Type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div
          className={styles.displayArea}
          dangerouslySetInnerHTML={{ __html: highlightWords(text) }}
        />
      </div>
    </main>
  );
}
