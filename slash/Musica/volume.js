const yaml = require("js-yaml")
const fs = require('fs');
const config = yaml.load(fs.readFileSync('settings/config.yml', 'utf8', 2))

module.exports = {
    name: "volume",
    description: "Set the volume for the music.",
    options: [{
        name: "volumen",
        description: "Set the volume",
        type: "INTEGER",
        required: true
    }],
    run: async (client, interaction, args) => {

    const vol = interaction.options.getInteger("volumen")

    const queue = client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({content: `:x: | There is nothing in the queue!`, ephemeral: true})
    const volume = parseInt(vol)
    if (isNaN(volume)) return interaction.reply({content: `:x: | Please specify a valid number!`, ephemeral: true})
    queue.setVolume(volume)
    interaction.reply({content: `:white_check_mark: | volume set to \`${volume}\``})

  }
}
