const TelegramBot = require("node-telegram-bot-api");
const NodeCache = require("node-cache");
const axios = require("axios");

const bot = new TelegramBot(`6075104105:AAEU8PFAFwMC5uYsYUNO8OzzQi9FMZSPnVs`, {
  polling: true,
});
const cache = new NodeCache({ stdTTL: 60 });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const message = "😊✌️Оберіть курс валют";
  const options = {
    reply_markup: {
      keyboard: [
        [
          {
            text: "USD",
            callback_data: "USD",
          },
          {
            text: "EUR",
            callback_data: "EUR",
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

//Function used to round numbers , example: round(23,3456) => 23,34
function round(number) {
  return (Math.round(number * 100) / 100).toFixed(2);
}

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  if (userMessage === "USD" || userMessage === "EUR") {
    //API request for PrivatBank
    axios
      .get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11`)
      .then((response) => {

        //Check for API response
        if (response.status !== 200) {
          console.log("No response from PrivatBank API");
        } else {
          console.log("Response from PrivatBank API was successful");
        }

        const data =
          userMessage === "USD" ? response.data[1] : response.data[0];
        let exchangeRateInfo = `<b>ПриватБанк</b> 
                              \n${data.ccy} => ${data.base_ccy}
                              \nКупівля <b>${round(data.buy)}</b>
                              \nПродаж <b>${round(data.sale)}</b>
                               `;
        bot.sendMessage(chatId, exchangeRateInfo, { parse_mode: "HTML" });
      })
      .catch((err) => {
        return console.log(err);
      });

    const currency = userMessage === "USD" ? "USD" : "EUR";
    const cachedExchangeRate = cache.get(currency);
    if (cachedExchangeRate) {
      bot.sendMessage(chatId, cachedExchangeRate, { parse_mode: "HTML" });
    } else {
      // API request for Monobank
      axios
        .get(`https://api.monobank.ua/bank/currency`)
        .then((response) => {
          //Check for API response
          if (response.status !== 200) {
            console.log("No response from MonoBank API");
          } else {
            console.log("Response from MonoBank API was successful");
          }

          const data =
            userMessage === "USD" ? response.data[0] : response.data[1];
          const uah = data.currencyCodeB ? "UAH" : "";
          const euro_or_dollar = data.currencyCodeA === 840 ? "USD" : "EUR";
          let exchangeRateInfo = `<b>Монобанк</b> 
                              \n${euro_or_dollar} => ${uah}
                              \nКупівля <b>${data.rateBuy}</b>
                              \nПродаж <b>${round(data.rateSell)}</b>`;

          cache.set(currency, exchangeRateInfo);
          bot.sendMessage(chatId, exchangeRateInfo, { parse_mode: "HTML" });
        })
        .catch((err) => {
          return console.log(err);
        });
    }
  }
});
