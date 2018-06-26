const Discord = require("discord.js")
const fs = require("fs")

const config = require("./config.js")

const client = new Discord.Client()

client.on("ready", () => {
    console.log("ready")

    const server = client.guilds.find("name", config.server_name)
    const channel = server.channels.find(chn => chn.name === config.channel_name && chn.type === "voice")

    channel.join().then(connection => {
        console.log("connected")

        const receiver = connection.createReceiver()
        connection.on("speaking", (user, speaking) => {
            if (speaking) {
                console.log("listen on")
                // NOTE: In the source code, there is a comment said
                // "The stream is 32-bit signed stereo PCM at 48KHz."
                // But actually, it's 16-bit. To convert to mp3, use next command.
                // ffmpeg -f s16le -ar 48000 -ac 2 -i out.pcm out.mp3
                const inputStream = receiver.createPCMStream(user)
                const outputStream = fs.createWriteStream("out.pcm", {"flags": "a"})
                inputStream.pipe(outputStream)
                inputStream.on("end", () => {
                    console.log("listen off")
                    outputStream.end()
                })
            }
        })
    })
})

client.login(config.token)
