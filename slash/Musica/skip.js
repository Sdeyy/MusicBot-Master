const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { Discord } = require('discord.js');
const yaml = require("js-yaml")
const fs = require('fs');
const config = yaml.load(fs.readFileSync('settings/config.yml', 'utf8', 2))
const distube = require("distube");

module.exports = {
    name: "skip",
    description: "Skip to the next song.",
    run: async (client, interaction, args) => {

        const canalvoz = new MessageEmbed()
        .setColor(config.EmbedColor)
        .setDescription(':x: | You need to be on a voice channel.')
    
        const canalvoz2 = new MessageEmbed()
        .setColor(config.EmbedColor)
        .setDescription(':x: | You have to be on the same voice channel as me.')
    
        const nocanciones = new MessageEmbed()
        .setColor(config.EmbedColor)
        .setDescription(':x: | There\'s no music on the queue.')
    
        const yapausada = new MessageEmbed()
        .setColor(config.EmbedColor)
        .setDescription(':x: | the song is paused.')

        const skiped = new MessageEmbed()
        .setColor(config.EmbedColor)
        .setDescription(':white_check_mark: | Skipped to the next song.')
    
    const queue = client.distube.getQueue(interaction.member.voice.channel)
    if(!queue) return interaction.reply({ embeds: [nocanciones], ephemeral: true})
    if(!interaction.member.voice.channel) return interaction.reply({ embeds: [canalvoz], ephemeral: true})
    if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ embeds: [canalvoz2], ephemeral: true})
    
    client.distube.skip(interaction.member.voice.channel)
    interaction.reply({ embeds: [skiped]})

    },
};