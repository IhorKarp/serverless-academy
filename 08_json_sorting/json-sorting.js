const https = require("https");

const endpoints = [
  "https://jsonbase.com/sls-team/json-793",
  "https://jsonbase.com/sls-team/json-955",
  "https://jsonbase.com/sls-team/json-231",
  "https://jsonbase.com/sls-team/json-931",
  "https://jsonbase.com/sls-team/json-93",
  "https://jsonbase.com/sls-team/json-342",
  "https://jsonbase.com/sls-team/json-770",
  "https://jsonbase.com/sls-team/json-491",
  "https://jsonbase.com/sls-team/json-281",
  "https://jsonbase.com/sls-team/json-718",
  "https://jsonbase.com/sls-team/json-310",
  "https://jsonbase.com/sls-team/json-806",
  "https://jsonbase.com/sls-team/json-469",
  "https://jsonbase.com/sls-team/json-258",
  "https://jsonbase.com/sls-team/json-516",
  "https://jsonbase.com/sls-team/json-79",
  "https://jsonbase.com/sls-team/json-706",
  "https://jsonbase.com/sls-team/json-521",
  "https://jsonbase.com/sls-team/json-350",
  "https://jsonbase.com/sls-team/json-64",
];

// Define a function to fetch a given endpoint URL with retries
async function fetchWithRetry(url, retryCount) {
  try {
    const response = await new Promise((resolve, reject) => {
      const req = https.get(url, (res) => {
        let data = "";
        // Accumulate the response data as it arrives
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(JSON.parse(data)));
      });
      req.on("error", reject);
    });

    // Recursively search for `isDone` in any nesting level
    function searchIsDone(obj) {
      for (const key in obj) {
        if (key === "isDone") {
          return obj[key];
        } else if (typeof obj[key] === "object") {
          const result = searchIsDone(obj[key]);
          if (result !== undefined) {
            return result;
          }
        }
      }
      return undefined;
    }

    const isDone = searchIsDone(response);
    if (isDone !== undefined) {
      console.log(`[Success] ${url}: isDone - ${isDone}`);
      return isDone;
    } else {
      console.log(`[Fail] ${url}: The endpoint is unavailable`);
    }
  } catch (error) {
    if (retryCount > 0) {
      console.log(`[Retry] ${url}: ${error.message}`);
      return fetchWithRetry(url, retryCount - 1);
    } else {
      console.log(`[Fail] ${url}: ${error.message}`);
    }
  }
}

async function main() {
  let trueCount = 0;
  let falseCount = 0;
  for (const endpoint of endpoints) {
    const isDone = await fetchWithRetry(endpoint, 3);
    if (isDone !== undefined) {
      if (isDone) {
        trueCount++;
      } else {
        falseCount++;
      }
    }
  }
  console.log(`Found True values: ${trueCount},`);
  console.log(`Found False values: ${falseCount}`);
}

main();
