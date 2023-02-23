const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'files');

// Array of file names to read
const files = Array.from({ length: 20 }, (_, i) => `out${i}.txt`);

// Function to find unique usernames in all files
const getUniqueUsernames = () => {
  const uniqueUsernames = new Set();

  for (const file of files) {
    const data = fs.readFileSync(path.join(directoryPath, file), 'utf-8');
    const usernames = data.split('-');
    usernames.forEach(username => uniqueUsernames.add(username));
  }

  return uniqueUsernames;
}

// Function to find usernames occurring in all files
const getUsernamesInAllFiles = () => {
  let commonUsernames = null;

  for (const file of files) {
    const data = fs.readFileSync(path.join(directoryPath, file), 'utf-8');
    const usernames = new Set(data.split('-'));

    if (commonUsernames === null) {
      commonUsernames = usernames;
    } else {
      commonUsernames = new Set([...commonUsernames].filter(username => usernames.has(username)));
    }
  }

  return commonUsernames;
}

// Function to find usernames occurring in at least 10 files
const getUsernamesInAtLeastTenFiles = () => {
  const usernameCounts = new Map();

  for (const file of files) {
    const data = fs.readFileSync(path.join(directoryPath, file), 'utf-8');
    const usernames = data.split('-');

    for (const username of usernames) {
      const count = usernameCounts.get(username) || 0;
      usernameCounts.set(username, count + 1);
    }
  }

  const usernamesInAtLeastTenFiles = [...usernameCounts].filter(([username, count]) => count >= 10).length;
  return usernamesInAtLeastTenFiles;
}

// Measure the performance of each function
console.time('getUniqueUsernames');
console.log('Unique usernames:', getUniqueUsernames().size);
console.timeEnd('getUniqueUsernames');

console.time('getUsernamesInAllFiles');
console.log('Usernames occurring in all files:', getUsernamesInAllFiles().size);
console.timeEnd('getUsernamesInAllFiles');

console.time('getUsernamesInAtLeastTenFiles');
console.log('Usernames occurring in at least 10 files:', getUsernamesInAtLeastTenFiles());
console.timeEnd('getUsernamesInAtLeastTenFiles');
