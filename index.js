// import bot from "./bot-config";
const bot = require('./bot-config');
bot.hears('/score', (ctx) => displayScore(ctx));
bot.action('r', (ctx) => game(ctx));
bot.action('p', (ctx) => game(ctx));
bot.action('s', (ctx) => game(ctx));
bot.startPolling();

function game(ctx) {
    const textToReply = "Привет!";
    ctx.reply(textToReply);
}

function displayScore() {

}