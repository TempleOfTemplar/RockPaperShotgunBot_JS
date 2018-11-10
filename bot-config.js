const Telegraf = require('telegraf');
const SocksAgent = require('socks5-https-client/lib/Agent');
const socksAgent = new SocksAgent({
        socksHost: "socksy.seriyps.ru",
        socksPort: 1080,
        socksUsername: "tg-mrsaram",
        socksPassword: "hAjRhFlx",
    }),
    bot = new Telegraf('771682963:AAEmFJwxI3yVxIILYYWkSXfquQqa_hUsvzk', {
        telegram: {
            agent: socksAgent
        }
    }),
    testMenu = Telegraf.Extra
        .markdown()
        .markup((m) => m.inlineKeyboard([
            m.callbackButton('Камень', 'r'),
            m.callbackButton('Ножницы', 's'),
            m.callbackButton('Бумага', 'p')
        ]));
bot.start((ctx) => {
    ctx.reply('Что выбираешь?', testMenu)
});
module.exports = bot;