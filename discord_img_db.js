var Discord = require('discord.js');
var bot = new Discord.Client();

const fs = require('fs');
const path = require("path");
require('dotenv').config();
var bodyParser = require('body-parser')
const CHANNEL = '735124659233882150'



const express = require('express')
const app = express()
var channel

//app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3009, function(){
    console.log('-')
    console.log('-')
    console.log('-')
    console.log('-')
    console.log('-')
    console.log('-')
    console.log('-')
    console.log('-')
    console.log('-')
    console.log('-')
    console.log('-')
    console.log('-')
    console.log('-')
	console.log("Server on");
})

app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function(req, res) {
    if(channel){
        extDetect((file) => {
            channel.send('', {
                files: [
                    "./"+file
                ]
            })
            .then((msg) => {
                console.log(msg.attachments.Collections)
                /*
                bot.channels.cache.get(CHANNEL).fetchMessages({ limit: 1 }).then(messages => {
                    let lastMessage = messages.first();
                    if (lastMessage.author.bot) {
                      console.log('b')
                      console.log(message.attachments)
                    }
                  })
                  .catch(console.error);
                  */
            })
        })
        res.send('listo perri')
    }
    console.log('no cargado')
})


bot.on('ready', client => {
    channel =  bot.channels.cache.get(CHANNEL)
})

bot.login(process.env.DISCORD_TOKEN);


const directoryPath = path.join(__dirname);

function extDetect(callback){
    let resultado
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            if(!resultado){
                //console.log('--')
                //console.log(file.split('newname').length)
                if(file.split('newname').length === 2) {
                    //console.log('----------------- '+ file)
                    callback(file)
                }
            }
            
        });
    })
}


function readFile(srcPath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(srcPath, 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    })
}

function writeFile(savPath, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(savPath, data, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve();
            }
        });
    })
}

