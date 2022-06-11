const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const yaml = require("js-yaml")
const fs = require('fs');
const config = yaml.load(fs.readFileSync('settings/config.yml', 'utf8', 2))
const distube = require("distube");

module.exports = {
    name: "resume",
    description: "Continue the paused music.",
    run: async (client, interaction, args) => {

        const canalvoz = new MessageEmbed()
        .setColor(config.EmbedColor)
        .setDescription(':x: | You need to be on a voice channel.')
    
        const canalvoz2 = new MessageEmbed()
        .setColor(config.EmbedColor)
        .setDescription(':x: | You need to be on the same voice channel as me.')
    
        const nocanciones = new MessageEmbed()
        .setColor(config.EmbedColor)
        .setDescription(':x: | There\'s no music on the queue.')
    
        const yapausada = new MessageEmbed()
        .setColor(config.EmbedColor)
        .setDescription(':x: | The song is not paused.')

        const pausada = new MessageEmbed()
        .setColor(config.EmbedColor)
        .setDescription(':white_check_mark: | The song has been summarized.')

        if(!interaction.member.voice.channel) return interaction.reply({ embeds: [canalvoz], ephemeral: true})
        if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ embeds: [canalvoz2], ephemeral: true})
    
    
    const queue = client.distube.getQueue(interaction.member.voice.channel)
    if(!queue) return interaction.reply({ embeds: [nocanciones], ephemeral: true})

    try{
      client.distube.resume(interaction.member.voice.channel)
      interaction.reply({ embeds: [pausada]})
      return;
    } catch (e) {
      interaction.reply({content: `An error has occurred **${e}**`, ephemeral: true})
    }
    },
};