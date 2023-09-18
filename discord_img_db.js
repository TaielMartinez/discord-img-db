const Discord = require('discord.js');
const bot = new Discord.Client();

require('dotenv').config();
const express = require('express');
const app = express();
var channel

app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ limit: '8mb', extended: true }));

app.get('/', function (req, res) {
    res.send('Header: "Content-Type: application/x-www-form-urlencoded" Body: ext-> "png", "jpg", etc y media-> "data:image/png;base64,iVBORw0KGiYdEiaBI0f... or iVBORw0KGiYdEiaBI0f..."');
});

app.post('/', function (req, res) {
    const media = req.body.media;
    const ext = req.body.ext;
    const attachment = new Discord.MessageAttachment(Buffer.from(media.split(';base64,').pop(), 'base64'), `media.${ext}`);
    if (channel) {
        channel.send(attachment)
            .then((msg) => {
                msg.attachments.forEach(attach => {
                    console.log(attach.attachment)
                    res.json({ media: attach.attachment, err: false })
                })
            })
            .catch((error) => {
                console.error(`Error al enviar la media a Discord: ${error}`);
                res.json({ media: false, err: 'Error al enviar la media a Discord' });
            });
    } else {
        console.log('Error al encontrar el canal', process.env.CHANNEL, channel);
        res.json({ media: false, err: 'Error al encontrar el canal' });
    }
});

bot.on('ready', () => {
    console.log('Bot is ready');
    channel = bot.channels.cache.get(process.env.CHANNEL);
});

bot.login(process.env.DISCORD_TOKEN);

const port = process.env.PORT || 3009;
app.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
});
