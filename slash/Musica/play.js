const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { Discord } = require('discord.js');
const yaml = require("js-yaml")
const fs = require('fs');
const config = yaml.load(fs.readFileSync('settings/config.yml', 'utf8', 2))
const distube = require("distube");

module.exports = {
    name: "play",
    description: "Play music.",
    options: [
        {
            name: 'musica',
            description: 'Cancion para escuchar',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction, args) => {

        const cancion = interaction.options.getString('musica')

    if(!interaction.member.voice.channel) return interaction.reply({ content: 'You need to be on a voice channel.', ephemeral: true})
    if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: 'Necesitas estar en el mismo canal de voz que yo.', ephemeral: true})

  interaction.client.distube.play(
    interaction.member.voice.channel,
    cancion,
    {
      textChannel: interaction.channel,
      member: interaction.member,
    }
  );
  const buscando = new MessageEmbed()
  .setColor(config.EmbedColor)
  .setDescription('Buscando cancion, espera un momento...')
  interaction.reply({ embeds: [buscando], ephemeral: true})
    },
};