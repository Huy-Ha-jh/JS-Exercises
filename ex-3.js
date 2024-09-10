const readline = require('readline');

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questionnaire = {
  Q1: {
    question: "Do you like coffee?",
    answers: {
      yes: "Q2",
      no: "Q3"
    }
  },
  Q2: {
    question: "How do you like your coffee?",
    answers: {
      black: "Q4",
      with_milk: "Q5"
    }
  },
  Q3: {
    question: "What do you prefer instead of coffee?",
    answers: {
      tea: "END",
      juice: "END"
    }
  },
  Q4: {
    question: "Do you want sugar with your coffee?",
    answers: {
      yes: "END",
      no: "END"
    }
  },
  Q5: {
    question: "Hot or Cold?",
    answers: {
      hot: "END",
      cold: "END"
    }
  }
};

let currentQuestion = "Q1"; // Start from the first question

// Function to display question and prompt for answer
function displayQuestion(questionId) {
  const questionData = questionnaire[questionId];
  console.log(questionData.question); // Display the question

  // Display possible answers
  const answers = Object.keys(questionData.answers);
  answers.forEach((answer, index) => {
    console.log(`${index + 1}. ${answer}`);
  });

  rl.question("Choose your answer: ", (userInput) => {
    const answerIndex = parseInt(userInput, 10) - 1;
    if (answerIndex < 0 || answerIndex >= answers.length) {
      console.log("Invalid answer. Try again.");
      displayQuestion(questionId); // Re-ask the same question
    } else {
      const userAnswer = answers[answerIndex];
      handleNextQuestion(questionId, userAnswer); // Go to the next question
    }
  });
}

// Function to handle moving to the next question
function handleNextQuestion(questionId, answer) {
  const nextId = questionnaire[questionId].answers[answer];

  if (nextId === "END") {
    console.log("Thank you! This is the end of the questionnaire.");
    rl.close(); // Close the readline interface
  } else {
    displayQuestion(nextId); // Display the next question
  }
}

// Start the questionnaire
displayQuestion(currentQuestion);
