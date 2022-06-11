const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { Discord } = require('discord.js');
const yaml = require("js-yaml")
const fs = require('fs');
const config = yaml.load(fs.readFileSync('settings/config.yml', 'utf8', 2))
const distube = require("distube");

module.exports = {
    name: "stop",
    description: "Stop the music and delete the queue.",
    run: async (client, interaction, args) => {

const queue = client.distube.getQueue(interaction)
if (!queue) return interaction.reply({content: `:x: | There's no music on the queue.`})
queue.stop()
interaction.reply({content: `:white_check_mark: | The music has stopped and the queue has been deleted.`})

    }
}