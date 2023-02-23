// Required modules
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
// Main function which calls itself recursively to repeatedly execute the sorting process
function main() {
  readline.question(
    "Hello. Enter 10 words or digits dividing them in spaces: ",
    (input) => {
      if (
        input.trim().length === 0 ||
        input.split(" ").length > 10 ||
        (input.split(" ").length === 1 && isNaN(parseInt(input.trim(), 10))) ||
        (input.split(" ").length === 2 &&
          input.split(" ")[0] === "" &&
          isNaN(parseInt(input.trim(), 10)))
      ) {
        console.log(
          "Enter input properly:\n1. limit input only up to 10 symbols/words;\n2. make sure you enter more than one symbol/word\n3. empty input is not allowed"
        );
        main();
        return;
      }
      const items = input.split(" ").map((i) => {
        let parsed = parseInt(i, 10);
        return isNaN(parsed) ? i : parsed;
      });

      readline.question(
        `How would you like to sort the input?
    1. Sort words alphabetically
    2. Show numbers from lesser to greater
    3. Show numbers from bigger to smaller
    4. Display words in ascending order by number of letters in the word
    5. Show only unique words
    6. Display only unique values from the set of words and numbers entered by the user
    7. To exit the program, enter 'exit'
  `,
        (choice) => {
          // Based on user choice, perform different sorts and operations on the input array
          switch (choice) {
            case "1":
              // Filter words from the array, and sort them alphabetically
              console.log(items.filter((i) => typeof i === "string").sort());
              break;
            case "2":
              // Filter numbers from the array, and sort them in ascending order
              console.log(
                items.filter((i) => typeof i === "number").sort((a, b) => a - b)
              );
              break;
            case "3":
              // Filter numbers from the array, and sort them in descending order
              console.log(
                items.filter((i) => typeof i === "number").sort((a, b) => b - a)
              );
              break;
            case "4":
              // Filter words from the array, and sort them based on the length of each word (ascending order)
              console.log(
                items
                  .filter((i) => typeof i === "string")
                  .sort((a, b) => a.length - b.length)
              );
              break;
            case "5":
              // Filter words from the array, and find the unique values using Set
              console.log([
                ...new Set(items.filter((i) => typeof i === "string")),
              ]);
              break;
            case "6":
              // Convert words into lowercase and map the array to find unique values, using Set
              console.log([
                ...new Set(
                  items.map((i) =>
                    typeof i === "string" ? i.toLowerCase() : i
                  )
                ),
              ]);
              break;
            case "exit":
              // Close the readline interface
              readline.close();
              return;
            default:
              console.log("Invalid choice. Try again.");
          }
          main();
        }
      );
    }
  );
}

main();
