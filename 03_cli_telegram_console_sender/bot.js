const Telegram = require("node-telegram-bot-api");
const Command = require("commander").Command;

const program = new Command();

const token = "5722652396:AAEmPwYrT026nJNAwf90AGFQfh0bpxxX74Q";

const bot = new Telegram(token);
bot.getUpdates().then((updates) => {
  console.log("Chat ID:", updates[0].message.chat.id);
});

program
  .command("send-message <message>")
  .description("Send a message to your telegram bot")
  .action((message) => {
    bot
      .sendMessage("721367051", message)
      .then(() => {
        console.log("Message sent successfully!");
        process.exit();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        process.exit();
      });
  });

program
  .command("send-photo <photo>")
  .description(
    "Send a photo to your telegram bot, just drag and drop it to the terminal"
  )
  .action((photo) => {
    bot
      .sendPhoto("721367051", photo, { caption: "Sent from CLI" })
      .then(() => {
        console.log("Photo sent successfully!");
        process.exit();
      })
      .catch((error) => {
        console.error("Error sending photo:", error);
        process.exit();
      });
  });

program.parse(process.argv);
