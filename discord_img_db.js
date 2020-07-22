var Discord = require('discord.js');
var bot = new Discord.Client();

const fs = require('fs');
require('dotenv').config();
var bodyParser = require('body-parser')
const CHANNEL = '735124659233882150'

const express = require('express');
const app = express()
var channel

//app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3009, function(){
	console.log("Server on");
})

app.use(bodyParser.json({limit: '8mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '8mb', extended: true}))

app.post('/', function(req, res) {

    let ext = req.body.ext
    let img = req.body.img
    let name = Date.now()

    //console.log(req.body)
    let replace = "data:image\/"+ext+";base64,"
    console.log(replace)
    var base64Data = img.replace(replace, "")
    //console.log(base64Data)

    fs.writeFile("img/"+name+"."+ext, base64Data, 'base64', function(err) {
        if(err) console.log(`Error al guardar la imagen, error: ${err}`)
        else {
            console.log('img: '+name+"."+ext)

            if(channel){
                channel.send('', {
                    files: [
                        "./img/"+name+"."+ext
                    ]
                })
                .then((msg) => {
                    msg.attachments.forEach(attach => {
                        fs.unlinkSync("img/"+name+"."+ext)
                        console.log(attach.attachment)
                        res.json({ img: attach.attachment, err: false })
                    })
                })
            } else {
                res.json({ img: false, err: 'Error al encontrar el canal' })
                console.log('no cargado')
                res.send('no cargado')
            }
        }
    })
})

bot.on('ready', client => {
    channel =  bot.channels.cache.get(CHANNEL)
})

bot.login(process.env.DISCORD_TOKEN)
