Discord simple voice chat recorder
==================================

A simple voice chat recorder bot for [Discord](https://discordapp.com/).
This bot is also echoing back the voice chat.

Usage
-----

Install dependencies by using [npm](https://www.npmjs.com/).

    npm install

Create an app and initialize a bot at <https://discordapp.com/developers/applications/me>.
Copy `cofig.js.example` to `config.js` then put the bot token, server name, and channel name which the bot is connecting.
Run script with npm.

    npm start

This will record the voice chat in `out.pcm` and also play the voice chat from the speakers.
Or, use `node` to pass arguments.

    node main.js -- [-f <file>, --file <file>] [-p, --play]

    -f, --file <file>   Record the voice chat to the <file>
    -p, --play          Play the voice chat from the speaker.

Warning, use your headerphones when playing the voice chat. Beacuse this it will echo back.
