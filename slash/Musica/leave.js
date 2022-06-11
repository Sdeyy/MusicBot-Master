const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { Discord } = require('discord.js');
const yaml = require("js-yaml")
const fs = require('fs');
const config = yaml.load(fs.readFileSync('settings/config.yml', 'utf8', 2))
const distube = require("distube");

module.exports = {
    name: "leave",
    description: "Leave of the voice channel.",
    run: async (client, interaction, args) => {
        client.distube.voices.leave(interaction)
        interaction.reply({content: `:white_check_mark: | I have successfully exited the voice channel.`})
    }
}