const Telegraf = require('telegraf');
const SocksAgent = require('socks5-https-client/lib/Agent');

const socksAgent = new SocksAgent({
    socksHost: "socksy.seriyps.ru",
    socksPort: 1080,
    socksUsername: "tg-mrsaram",
    socksPassword: "hAjRhFlx",
});

const bot = new Telegraf('771682963:AAEmFJwxI3yVxIILYYWkSXfquQqa_hUsvzk', {
    telegram: {
        agent: socksAgent
    }
});

let totalGames = 0, wins = 0, loses = 0;
bot.start((ctx) => ctx.reply('Что выбираешь?', testMenu).then(() => {
    ctx.reply('about', aboutMenu)
}));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));

const testMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('Камень', 'r'),
        m.callbackButton('Ножницы', 's'),
        m.callbackButton('Бумага', 'p')
    ]));

const aboutMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('Посмотреть счёт', 'score')
    ]).resize());

bot.action('r', (ctx) => game(ctx));
bot.action('p', (ctx) => game(ctx));
bot.action('s', (ctx) => game(ctx));
bot.action('score', (ctx) => displayScore(ctx));

bot.startPolling();

function getComputerChoise() {
    const choices = ["r", "p", "s"],
        randomNumber = Math.floor(Math.random() * choices.length);
    return choices[randomNumber];
}

function displayScore(ctx) {
    ctx.reply(`Ты победил ${wins} раз, проиграл ${loses} раз из ${totalGames} игр`);
}

function game(ctx) {
    const userChoice = ctx.match,
        computerChoice = getComputerChoise();
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            totalGames++;
            wins++;
            ctx.reply(choicesToText(userChoice, computerChoice) + "\n (Ты победил!)");
            break;
        case "rp":
        case "ps":
        case "sr":
            totalGames++;
            loses--;
            ctx.reply(choicesToText(userChoice, computerChoice) + "\n (Ты Проиграл!)");
            break;
        case "rr":
        case "pp":
        case "ss":
            totalGames++;
            ctx.reply(choicesToText(userChoice, computerChoice) + "\n (Ничья!)");
            break;
    }
    ctx.reply('Что выбираешь?', testMenu)
}

function win(ctx) {
    totalGames++;
    wins++;
    ctx.reply(choicesToText(userChoice, computerChoice) + " (Ты победил!)");
}

function lose(ctx) {
    totalGames++;
    loses--;
    ctx.reply(choicesToText(userChoice, computerChoice) + " (Ты Проиграл!)");
}

function draw(ctx) {
    totalGames++;
    ctx.reply(choicesToText(userChoice, computerChoice) + " (Ничья!)");
}

function choicesToText(userChoice, computerChoice) {
    return `===> Компьютер выбрал ${choiceToText(computerChoice)}, ты выбрал ${choiceToText(userChoice)}. <===`
}

function choiceToText(choice) {
    switch (choice) {
        case "r":
            return "Камень";
        case "p":
            return "Бумагу";
        case "s":
            return "Ножницы";
    }
}