const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define the questionnaire as a tree structure with IDs
const questionnaire = {
  id: 1,
  question: "Do you have a pet?",
  options: {
    yes: {
      id: 2,
      question: "What kind of pet do you have? (dog/cat)",
      options: {
        dog: {
          id: 3,
          question: "Do you take your dog for walks?",
          options: {
            yes: { id: 4, question: "How often do you walk your dog?" },
            no: { id: 5, question: "Why don't you walk your dog?" }
          }
        },
        cat: {
          id: 6,
          question: "Does your cat like to play?",
          options: {
            yes: { id: 7, question: "What toys does your cat like?" },
            no: { id: 8, question: "Is your cat generally calm?" }
          }
        },
        other: { 
          id: 9,
          question: "Sorry, we only handle dogs and cats in this questionnaire."
        }
      }
    },
    no: {
      id: 10,
      question: "Would you like to have a pet in the future?",
      options: {
        yes: { id: 11, question: "What pet would you like to have?" },
        no: { id: 12, question: "Why don't you want a pet?" }
      }
    }
  }
};

let nextId = 13;  // Incremental ID for new questions

// Function to ask a question and handle user input
function askQuestion(node) {
  // If the current question is a final question, handle it appropriately
  if (!node.options || Object.keys(node.options).length === 0) {
    rl.question(node.question + " ", function(answer) {
      console.log("Thank you for your answer.");
      showMenu(); // Return to the menu after answering the final question
    });
  } else {
    // Otherwise, ask the question and expect a follow-up answer
    rl.question(node.question + " ", function(answer) {
      answer = answer.toLowerCase();

      // Check if the answer matches predefined options
      if (node.options && node.options[answer]) {
        askQuestion(node.options[answer]); // Move to the next question
      } else if (node.options) {
        if (!node.options[answer] && Object.keys(node.options).length === 1 && Object.keys(node.options)[0].toLowerCase() !== 'end') {
          // Handle the case where the input is open-ended (not a strict yes/no)
          console.log("Thank you for your answer.");
          showMenu();
        } else if (node.options['other']) {
          console.log(node.options['other'].question); // Show the 'other' message
          showMenu(); // End the questionnaire and show the menu again
        } else {
          console.log("Invalid input. Please answer with a valid option.");
          askQuestion(node); // Repeat the same question for invalid input
        }
      } else {
        console.log("End of questionnaire.");
        showMenu(); // Show the CLI menu after the questionnaire ends
      }
    });
  }
}

// Function to find a question by its ID
function findQuestionById(node, id) {
  if (node.id === id) {
    return node;
  }
  if (node.options) {
    for (const optionKey in node.options) {
      const result = findQuestionById(node.options[optionKey], id);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

// Function to update a question by its ID
function updateQuestionById(id, newQuestion) {
  const node = findQuestionById(questionnaire, id);
  if (node) {
    node.question = newQuestion;
    console.log(`Question with ID ${id} updated successfully.`);
  } else {
    console.log(`Question with ID ${id} not found.`);
  }
}

// Function to delete a question by its ID
function deleteQuestionById(id) {
  function deleteQuestion(node, id) {
    if (node.options) {
      for (const optionKey in node.options) {
        if (node.options[optionKey].id === id) {
          delete node.options[optionKey];
          return true;
        } else {
          const result = deleteQuestion(node.options[optionKey], id);
          if (result) {
            return true;
          }
        }
      }
    }
    return false;
  }

  const deleted = deleteQuestion(questionnaire, id);
  if (deleted) {
    console.log(`Question with ID ${id} deleted successfully.`);
  } else {
    console.log(`Question with ID ${id} not found.`);
  }
}

// Function to insert a new question and handle follow-up options
function insertQuestion(parentId, optionKey, newQuestion, isFinalQuestion = false) {
  const parentNode = findQuestionById(questionnaire, parentId);
  if (parentNode && parentNode.options) {
    const newNode = { id: nextId++, question: newQuestion };
    
    if (!isFinalQuestion) {
      newNode.options = {};

      // Prompt user to add follow-up options
      rl.question("Enter the options for this question (comma-separated, e.g., yes,no, or leave blank for open-ended): ", function(optionsInput) {
        if (optionsInput.trim() === "") {
          // If no options are entered, mark this as an open-ended question
          parentNode.options[optionKey] = newNode;
          console.log(`New open-ended question inserted under parent ID ${parentId} with option ${optionKey}.`);
          showMenu();
        } else {
          const options = optionsInput.split(',').map(opt => opt.trim().toLowerCase());
          
          // For each option, add a follow-up question
          function addFollowUp(index) {
            if (index < options.length) {
              const option = options[index];
              rl.question(`Enter the follow-up question for option '${option}' or 'end' to mark it as the end: `, function(followUpQuestion) {
                if (followUpQuestion.toLowerCase() === 'end') {
                  // If the user enters 'end', mark this as a final question
                  newNode.options[option] = { id: nextId++, question: "End of this branch." };
                } else {
                  // Otherwise, add the follow-up question and allow further options
                  newNode.options[option] = { id: nextId++, question: followUpQuestion, options: {} };
                }
                addFollowUp(index + 1); // Process the next option
              });
            } else {
              parentNode.options[optionKey] = newNode;
              console.log(`New question inserted under parent ID ${parentId} with option ${optionKey}.`);
              showMenu(); // Show menu again after operation
            }
          }

          addFollowUp(0); // Start adding follow-up questions
        }
      });
    } else {
      parentNode.options[optionKey] = newNode;
      console.log(`New final question inserted under parent ID ${parentId} with option ${optionKey}.`);
      showMenu(); // Show menu again after operation
    }
  } else {
    console.log(`Parent with ID ${parentId} not found or does not allow options.`);
  }
}

// CLI interface for managing the questionnaire
function showMenu() {
  console.log("\n--- Questionnaire Management ---");
  console.log("1. Insert a new question");
  console.log("2. Edit an existing question");
  console.log("3. Delete a question");
  console.log("4. Start the questionnaire");
  console.log("5. Exit");

  rl.question("Choose an option (1-5): ", function(option) {
    if (option === '1') {
      // Insert a new question
      rl.question("Enter the parent question ID: ", function(parentId) {
        rl.question("Enter the option key for the new question (e.g., yes, no, other): ", function(optionKey) {
          rl.question("Enter the new question text: ", function(newQuestion) {
            rl.question("Is this a final question (yes/no)? ", function(isFinal) {
              const isFinalQuestion = isFinal.toLowerCase() === 'yes';
              insertQuestion(parseInt(parentId), optionKey.toLowerCase(), newQuestion, isFinalQuestion);
            });
          });
        });
      });
    } else if (option === '2') {
      // Edit an existing question
      rl.question("Enter the question ID to edit: ", function(id) {
        rl.question("Enter the new question text: ", function(newQuestion) {
          updateQuestionById(parseInt(id), newQuestion);
          showMenu(); // Show menu again after operation
        });
      });
    } else if (option === '3') {
      // Delete a question
      rl.question("Enter the question ID to delete: ", function(id) {
        deleteQuestionById(parseInt(id));
        showMenu(); // Show menu again after operation
      });
    } else if (option === '4') {
      // Start the questionnaire
      askQuestion(questionnaire);
    } else if (option === '5') {
      console.log("Exiting...");
      rl.close();
    } else {
      console.log("Invalid option. Please choose between 1 and 5.");
      showMenu();
    }
  });
}

// Start the CLI menu
showMenu();
