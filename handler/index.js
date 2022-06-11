const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);
const wait = require('util').promisify(setTimeout);
const { DisTube } = require('distube')
const Discord = require('discord.js')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const yaml = require("js-yaml")
const fs = require('fs');
const config = yaml.load(fs.readFileSync('settings/config.yml', 'utf8', 2))

module.exports = async (client) => {

    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    const eventFiles = await globPromise(`${process.cwd()}/eventos/*.js`);
    eventFiles.map((value) => require(value));

    const slashCommands = await globPromise(
        `${process.cwd()}/slash/**/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file.name) return;
        client.slashCommands.set(file.name, file);
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {

        await client.guilds.cache.get(config.GuildID).commands.set(arrayOfSlashCommands);
        
    });

client.distube = new DisTube(client, {
  leaveOnStop: config.Music.leaveOnStop,
  emitNewSongOnly: config.Music.emitNewSongOnly,
  emitAddSongWhenCreatingQueue: config.Music.emitAddSongWhenCreatingQueue,
  emitAddListWhenCreatingQueue: config.Music.emitAddListWhenCreatingQueue,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: config.Music.emitEventsAfterFetching
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ],
  youtubeDL: config.Music.youtubeDL
})

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube

  .on('playSong', (queue, song) =>
    queue.textChannel.send({embeds: [new Discord.MessageEmbed()
        .setColor(config.EmbedColor)
        .setDescription(`Now playing: [${song.name}](${song.url}) - ${song.user}`)]})
  )

  .on('addSong', (queue, song) =>
    queue.textChannel.send({embeds: [new Discord.MessageEmbed()
        .setColor(config.EmbedColor)
        .setDescription(`Music added to the playlist [${song.name}](${song.url}) - ${song.user}`)]})
  )

  .on('addList', (queue, playlist) =>
    queue.textChannel.send({embeds: [new Discord.MessageEmbed()
      .setColor(config.EmbedColor)
      .setDescription(`The playlist \`${playlist.name}\` has been added (added ${playlist.songs.length} songs) to the playlist}`)
    ]})
  )

  .on('error', (channel, e) => {
    channel.send(`:x: | An error has been occurred: ${e.toString().slice(0, 1974)}`)
    console.error(e)
  })

  .on('empty', channel => channel.send('The voice channel is empty, leaving...'))

  .on('searchNoResult', (message, query) =>
    message.channel.send(`:x: | Sorry, your search returned zero results for \`${query}\`!`)
  )

  .on('finish', queue => queue.textChannel.send('The music has ended.'))

}