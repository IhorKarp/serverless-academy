const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const bot = new TelegramBot("6091110487:AAHCQ3dqLojB_P-IpbmupgJXyvDlvgyiTg8", {
  polling: true,
});

// When a user types the "/start" command, this event listener is triggered
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const message = "😊✌️Choose the city for the weather forecast:";
  const options = {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Forecast in Sofia",
          },
          {
            text: "Forecast in Bucharest",
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };

  if (
    bot.sendSticker(
      chatId,
      "CAACAgIAAxkBAAEHtr5j6UTKTGP0_2Xqjh8_ZL-LS2iGggACCwADxztGGxtCmHOkU-uCLgQ"
    )
  ) {
    bot.sendMessage(chatId, message, options);
  }
});

// When the bot receives a message from the user, this event listener is triggered
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  // If user will choose option 'Forecast in Sofia' =>
  if (userMessage === "Forecast in Sofia") {
    const message = "⌛Choose the interval for the forecast in Sofia:";
    city = "Sofia";
    const options = {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Forecast every 3 hours",
            },
            {
              text: "Forecast every 6 hours",
            },
          ],
          [
            {
              text: "Back",
            },
          ],
        ],
        resize_keyboard: true, // Resize the keyboard to fit the screen
        one_time_keyboard: true, // Show the keyboard only once
      },
    };

    bot.sendMessage(chatId, message, options);

    // If user will choose option 'Forecast in Bucharest' =>
  } else if (userMessage === "Forecast in Bucharest") {
    const message = "⌛Choose the interval for the forecast in Bucharest:";
    city = "Bucharest";
    const options = {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Forecast every 3 hours",
            },
            {
              text: "Forecast every 6 hours",
            },
          ],
          [
            {
              text: "Back",
            },
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    bot.sendMessage(chatId, message, options);

    //If user will choose option 'Back' =>
  } else if (userMessage === "Back") {
    const message = "😊✌️Choose the city for the weather forecast:";
    const options = {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Forecast in Sofia",
            },
            {
              text: "Forecast in Bucharest",
            },
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    bot.sendMessage(chatId, message, options);
  }

  if (
    userMessage === "Forecast every 3 hours" ||
    userMessage === "Forecast every 6 hours"
  ) {
    const interval = userMessage === "Forecast every 3 hours" ? 3 : 6;
    const cityName = city;
    const weatherAppiID = `0efb4fc16a9ed98dc0b3aafd8491d6ad`;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${weatherAppiID}`
      )
      .then((response) => {
        //Check for API response
        if (response.status !== 200) {
          console.log("No response from API");
          throw new Error("Failed to get weather forecast");
        } else {
          console.log("Response from API was successful");
        }

        const forecast = response.data.list[0];

        //To show the current date and time in Sofia and Bucharest
        function date() {
          let newDate = new Date();
          let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          let day = days[newDate.getDay()];
          let hours = newDate.getHours();
          if (hours < 10) {
            hours = `0${hours}`;
          }
          let minutes = newDate.getMinutes();
          if (minutes < 10) {
            minutes = `0${minutes}`;
          }
          return `${day} , ${hours}:${minutes}`;
        }

        let forecastMessage = "";

        function getForecastMessage() {
          forecastMessage = `🤫<b>Weather Forecast in ${cityName} for every ${interval} hours:</b>
                              \n📅 ${date()}
                              \n🌡️Temperature:
                              \n       👉🏼 min   <b>${Math.round(
                                forecast.main.temp_min
                              )}°</b> 
                              \n       👉🏼 max   <b>${Math.round(
                                forecast.main.temp_max
                              )}°</b>
                              \n       👉🏼 feels like   <b>${Math.round(
                                forecast.main.feels_like
                              )}°</b>
                              \n💦Humidity:  <b>${
                                forecast.main.humidity
                              } %</b>     
                              \n👀Weather status:  <b>${
                                forecast.weather[0].description
                              }</b>
                              \n🌬️Wind Speed:  <b>${
                                forecast.wind.speed
                              } meter/second</b>
                              \n☁️Clouds:  <b>${forecast.clouds.all} %</b>`;

          return forecastMessage;
        }

        bot.sendPhoto(
          chatId,
          `https://source.unsplash.com/random/300×250/?${forecast.weather[0].description}`,
          { caption: `Picture shows current weather status` }
        );
        bot.sendMessage(chatId, getForecastMessage(), { parse_mode: "HTML" });

        // Depending on the interval it will automatically show weather forecast every 3 or 6 hours
        setInterval(() => {
          bot.sendPhoto(
            chatId,
            `https://source.unsplash.com/random/300×250/?${forecast.weather[0].description}`,
            { caption: `Picture shows current weather status` }
          );
          bot.sendMessage(chatId, getForecastMessage(), { parse_mode: "HTML" });
        }, interval * 60 * 60 * 1000);
      })

      .catch((error) => {
        console.error(error);
        bot.sendMessage(chatId, "Unable to get weather data");
      });
  }
});

// To get help on how to work with terminal in order to start Telegram bot
const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`Usage: 
             \n To start Telegram bot just write in terminal : node bot.js
             \n--help, -h    Show help
             \n--version, -v Show version
`);
}
