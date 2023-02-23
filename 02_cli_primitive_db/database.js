import fs from "fs";
import inquirer from "inquirer";
import path from "path";

let users = []; //Initializing an empty array to store the user data
const __dirname = path.resolve(); // Storing the resolved value of the current directory path

// Function to save the users data to a file named 'users.txt' in the current directory
const saveData = () => {
  fs.writeFileSync(path.resolve(__dirname, "users.txt"), JSON.stringify(users));
};

// Function to capitalize the first letter of a given string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to load the users data from the 'users.txt' file in the current directory
const loadData = () => {
  try {
    users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "users.txt")));
  } catch (error) {
    users = [];
  }
};

// Function to create a user and add it to the `users` array
const createUser = () => {
  // Use the inquirer library to prompt the user for input
  inquirer
    .prompt([
      // First prompt for the user's name
      {
        type: "input",
        name: "name",
        message: "Enter the user`s name. To cancel press ENTER",
      },
    ])
    .then((answers) => {
      // Check if the user entered a name
      if (!answers.name || answers.name.trim() === "") {
        // If the name is not provided, call the askToSearch function
        askToSearch();
      } else {
        // If a name was provided, ask for additional information
        inquirer
          .prompt([
            // Prompt for the user's gender
            {
              type: "list",
              name: "gender",
              message: "Choose your gender:",
              choices: ["Male", "Female", "Other"],
            },
            // Prompt for the user's age
            {
              type: "input",
              name: "age",
              message: "Enter your age:",
              validate: (input) =>
                !isNaN(input) ? true : "Please enter a valid number",
            },
          ])
          .then((innerAnswers) => {
            // Add the user to the `users` array
            users.push({
              name: capitalizeFirstLetter(answers.name.toLowerCase()),
              gender: innerAnswers.gender,
              age: innerAnswers.age,
            });
            // Call the `saveData` function to save the users array to a file
            saveData();
            // Ask the user if they want to add another user
            inquirer
              .prompt([
                {
                  type: "confirm",
                  name: "continueAdding",
                  message: "Do you want to add another user?",
                  default: false,
                },
              ])
              .then((confirmAnswer) => {
                // If the user wants to add another user, call the `createUser` function again
                if (confirmAnswer.continueAdding) {
                  createUser();
                } else {
                  // If the user doesn't want to add another user, call the `askToSearch` function
                  askToSearch();
                }
              });
          });
      }
    });
};

// Search for a user in the `users` array and display it if found
const searchUser = () => {
  // inquirer library is used to prompt the user to input the name of the user they want to search
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter user name to search:",
      },
    ])
    .then((answer) => {
      // the name entered by the user is capitalized using the capitalizeFirstLetter function
      const userName = capitalizeFirstLetter(answer.name);
      // the users array is searched for the user with the matching name using the Array.prototype.find() method
      const user = users.find((user) => user.name === userName);
      // if the user is found, it is logged to the console using JSON.stringify()
      if (user) {
        console.log(`User found: ${JSON.stringify(user)}`);
      } else {
        console.log(`User not found`);
      }
    });
};

// Ask the user if they want to search for a user in the `users` array
const askToSearch = () => {
  inquirer
    .prompt([
      {
        type: "confirm",
        key: "search",
        name: "search",
        message: "Do you want to search for a user in DB?",
      },
    ])
    .then((answer) => {
      if (answer.search) {
        users.forEach((user) => {
          console.log(JSON.stringify(user));
        });
        searchUser();
      } else {
        process.exit();
      }
    });
};

loadData(); // Load the data from storage
if (createUser()) {
  askToSearch();
}
