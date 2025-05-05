const questions = [
  {
    id: 1,
    question: "What day comes after Monday?",
    choices: ["A. Wednesday", "B. Tuesday", "C. Sunday"],
    answer: "B",
    type: "Recall",
  },
  {
    id: 2,
    question: "Which of these is a winter month?",
    choices: ["A. July", "B. December", "C. May"],
    answer: "B",
    type: "Recall",
  },
  {
    id: 3,
    question: "Which of these is NOT a continent?",
    choices: ["A. Asia", "B. Africa", "C. California"],
    answer: "C",
    type: "Recall",
  },
  {
    id: 4,
    question: "Which is heavier?",
    choices: ["A. Feather", "B. Rock", "C. Paper"],
    answer: "B",
    type: "Analysis",
  },
  {
    id: 5,
    question: "Which object does not belong?",
    choices: ["A. Chair", "B. Table", "C. Apple"],
    answer: "C",
    type: "Analysis",
  },
  {
    id: 6,
    question:
      "If a train departs at 3 PM and travels for 2 hours, what time does it arrive?",
    choices: ["A. 4 PM", "B. 5 PM", "C. 6 PM"],
    answer: "B",
    type: "Analysis",
  },
  {
    id: 7,
    question: "You see a green light. What should you do?",
    choices: ["A. Walk", "B. Stop", "C. Sit"],
    answer: "A",
    type: "Sensory",
  },
  {
    id: 8,
    question:
      "A buzzer sounds and a red shape flashes on a screen. What should you do?",
    choices: ["A. Walk faster", "B. Freeze", "C. Turn left"],
    answer: "B",
    type: "Sensory",
  },
  {
    id: 9,
    question:
      "Music speeds up and a green light flashes rapidly. What’s the best response?",
    choices: [
      "A. Walk forward briskly while swinging arms",
      "B. Sit down",
      "C. Turn around slowly",
    ],
    answer: "A",
    type: "Sensory",
  },
];

export default questions;
