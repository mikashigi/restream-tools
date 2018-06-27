const discord = require("discord.js")
const fs = require("fs")

const config = require("./config.js")

const client = new discord.Client()

const Speaker = require("speaker")

process.on("SIGINT", () => {
    console.log("destroy");
    client.destroy().then(() => {
        process.exit()
    })
})

client.on("ready", () => {
    console.log("ready")

    const server = client.guilds.find("name", config.server_name)
    const channel = server.channels.find(chn => chn.name === config.channel_name && chn.type === "voice")

    channel.join().then(connection => {
        console.log("connected")

        // PCM stream is 16-bit, stereo, 48kHz.
        // NOTE: In the source code, there is a comment said "The stream is 32-bit signed stereo PCM at 48KHz."
        // But actually, it's 16-bit.
        // To convert to mp3, use next command.
        // $ ffmpeg -f s16le -ar 48000 -ac 2 -i out.pcm out.mp3
        const outputStream = fs.createWriteStream("out.pcm")
        // NOTE: `speaker` should be created in every spearking time, however there is a bug that
        // when we call `end()`, the app will crash by the illegal instruction.
        // To avoid it, we create speaker once here and not end(), but this will put a bunch of
        // `warning: Didn't have any audio data in callback (buffer underflow)` warning.
        // See <https://github.com/TooTallNate/node-speaker/issues/92> and
        // <https://github.com/TooTallNate/node-speaker/issues/18>.
        const speaker = new Speaker({
            channels: 2,
            bitDepth: 16,
            sampleRate: 48000
        })

        connection.on("disconnect", () => {
            console.log("disconnect")
            outputStream.end()
            speaker.end()
        })

        const receiver = connection.createReceiver()
        connection.on("speaking", (user, speaking) => {
            if (speaking) {
                console.log("listen on: " + user.username)

                const inputStream = receiver.createPCMStream(user)
                inputStream.pipe(outputStream, {end: false})
                inputStream.pipe(speaker, {end: false})

                inputStream.on("end", () => {
                    console.log("listen off: " + user.username)
                })
            }
        })
    })
})

client.login(config.token)
