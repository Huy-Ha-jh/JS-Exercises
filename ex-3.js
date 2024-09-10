const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define the questionnaire as a tree structure
const questionnaire = {
  question: "Do you have a pet?",
  options: {
    yes: {
      question: "What kind of pet do you have? (dog/cat)",
      options: {
        dog: {
          question: "Do you take your dog for walks?",
          options: {
            yes: { question: "How often do you walk your dog?" },
            no: { question: "Why don't you walk your dog?" }
          }
        },
        cat: {
          question: "Does your cat like to play?",
          options: {
            yes: { question: "What toys does your cat like?" },
            no: { question: "Is your cat generally calm?" }
          }
        },
        other: { // If the user has a pet other than dog or cat
          question: "Sorry, we only handle dogs and cats in this questionnaire."
        }
      }
    },
    no: {
      question: "Would you like to have a pet in the future?",
      options: {
        yes: { question: "What pet would you like to have?" },
        no: { question: "Why don't you want a pet?" }
      }
    }
  }
};

// Function to ask a question and handle user input
function askQuestion(node) {
  rl.question(node.question + " ", function(answer) {
    answer = answer.toLowerCase();

    // Validate the answer based on available options
    if (node.options && node.options[answer]) {
      askQuestion(node.options[answer]); // Move to the next question
    } else if (node.options) {
      if (!node.options[answer] && answer !== 'dog' && answer !== 'cat') {
        if (node.options['other']) {
          console.log(node.options['other'].question); // Show the 'other' message
          rl.close(); // End the questionnaire
        } else {
          console.log("Invalid input. Please answer with a valid option.");
          askQuestion(node); // Repeat the same question for invalid input
        }
      } else {
        console.log(`Please choose from the available options: ${Object.keys(node.options).join('/')}`);
        askQuestion(node); // Ask the same question again if input is invalid
      }
    } else {
      console.log("End of questionnaire.");
      rl.close(); // Close the readline interface
    }
  });
}

// Start the questionnaire
askQuestion(questionnaire);
