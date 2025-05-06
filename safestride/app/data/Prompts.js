const prompts = [
  // === Recall - Easy ===
  {
    type: "Recall",
    difficulty: "easy",
    message: "What day comes after Monday?",
  },
  {
    type: "Recall",
    difficulty: "easy",
    message: "What color is the sky on a clear day?",
  },
  {
    type: "Recall",
    difficulty: "easy",
    message: "Which of these is a fruit?",
  },
  {
    type: "Recall",
    difficulty: "easy",
    message: "What comes after 5?",
  },
  {
    type: "Recall",
    difficulty: "easy",
    message: 'Which word starts with the letter "B"?',
  },

  // === Recall - Medium ===
  {
    type: "Recall",
    difficulty: "medium",
    message: "What is the opposite of 'Cold'?",
  },
  {
    type: "Recall",
    difficulty: "medium",
    message: "What sound does a dog make?",
  },
  {
    type: "Recall",
    difficulty: "medium",
    message: "What do bees make?",
  },
  {
    type: "Recall",
    difficulty: "medium",
    message: "Where does the sun rise?",
  },
  {
    type: "Recall",
    difficulty: "medium",
    message: "What is H2O?",
  },

  // === Recall - Hard ===
  {
    type: "Recall",
    difficulty: "hard",
    message: "Which planet is known as the Red Planet?",
  },
  {
    type: "Recall",
    difficulty: "hard",
    message: "Who wrote 'Romeo and Juliet'?",
  },
  {
    type: "Recall",
    difficulty: "hard",
    message: "What gas do plants absorb?",
  },
  {
    type: "Recall",
    difficulty: "hard",
    message: "How many continents are there?",
  },
  {
    type: "Recall",
    difficulty: "hard",
    message: "In which year did the Titanic sink?",
  },

  // === Analysis - Easy ===
  {
    type: "Analysis",
    difficulty: "easy",
    message: "Which item does not belong?",
  },
  {
    type: "Analysis",
    difficulty: "easy",
    message: "Which is heavier?",
  },
  {
    type: "Analysis",
    difficulty: "easy",
    message: "Which is the odd one out?",
  },
  {
    type: "Analysis",
    difficulty: "easy",
    message: "Which shape has 3 sides?",
  },
  {
    type: "Analysis",
    difficulty: "easy",
    message: "Which number is smallest?",
  },

  // === Analysis - Medium ===
  {
    type: "Analysis",
    difficulty: "medium",
    message: "Count back from 20: 20, 17, __?",
  },
  {
    type: "Analysis",
    difficulty: "medium",
    message: "Which doesn’t belong: Fork, Spoon, Apple?",
  },
  {
    type: "Analysis",
    difficulty: "medium",
    message: "Which is not a continent?",
  },
  {
    type: "Analysis",
    difficulty: "medium",
    message: "If a train leaves at 3 PM and travels 2 hours, what time is it?",
  },
  {
    type: "Analysis",
    difficulty: "medium",
    message: "Find the pattern: A-1, B-2, __?",
  },

  // === Analysis - Hard ===
  {
    type: "Analysis",
    difficulty: "hard",
    message: "What comes next: 5, 10, 15, __?",
  },
  {
    type: "Analysis",
    difficulty: "hard",
    message: "Banana, Chair, Mango — which doesn’t fit?",
  },
  {
    type: "Analysis",
    difficulty: "hard",
    message: "Which one is an even number?",
  },
  {
    type: "Analysis",
    difficulty: "hard",
    message: "What comes next: A, C, E, __?",
  },
  {
    type: "Analysis",
    difficulty: "hard",
    message: "What is next: 2, 4, 8, __?",
  },

  // === Sensory - Easy ===
  {
    type: "Sensory",
    difficulty: "easy",
    message: "You see a green light. What should you do?",
  },
  {
    type: "Sensory",
    difficulty: "easy",
    message: "You hear a loud bell. What might it mean?",
  },
  {
    type: "Sensory",
    difficulty: "easy",
    message: "A buzzer sounds and a red shape flashes. What should you do?",
  },
  {
    type: "Sensory",
    difficulty: "easy",
    message: "A soft melody plays. What is likely happening?",
  },
  {
    type: "Sensory",
    difficulty: "easy",
    message: "A blue circle flashes. What should you do?",
  },

  // === Sensory - Medium ===
  {
    type: "Sensory",
    difficulty: "medium",
    message: "Music speeds up and green lights flash. What’s your response?",
  },
  {
    type: "Sensory",
    difficulty: "medium",
    message: "Flashing red and a siren sound. What does it mean?",
  },
  {
    type: "Sensory",
    difficulty: "medium",
    message: "A whistle blows twice. What should you do?",
  },
  {
    type: "Sensory",
    difficulty: "medium",
    message: "Soft music plays and green light appears. Action?",
  },
  {
    type: "Sensory",
    difficulty: "medium",
    message: "Bright yellow light flashes with a buzz. What to do?",
  },

  // === Sensory - Hard ===
  {
    type: "Sensory",
    difficulty: "hard",
    message: "You hear 3 short beeps and see red lights. What should you do?",
  },
  {
    type: "Sensory",
    difficulty: "hard",
    message: "A strobe light blinks and fast music plays. What’s the cue?",
  },
  {
    type: "Sensory",
    difficulty: "hard",
    message: "A red triangle appears with a harsh buzz. Reaction?",
  },
  {
    type: "Sensory",
    difficulty: "hard",
    message: "Sudden silence after loud music. What does it signal?",
  },
  {
    type: "Sensory",
    difficulty: "hard",
    message: "Two red lights blink and a whistle sounds. What should you do?",
  },
];

export default prompts;
