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

Warning, use your headerphones beacuse this recorder is also echoing back the voice chat.
To disable it, remove `speaker` usage from the code.
