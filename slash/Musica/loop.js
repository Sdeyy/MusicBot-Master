const yaml = require("js-yaml")
const fs = require('fs');
const config = yaml.load(fs.readFileSync('settings/config.yml', 'utf8', 2))

module.exports = {
    name: "loop",
    description: "Set the loop type.",
    options: [
        {
            name: "mode",
            description: "Mode of the loop",
            type: "STRING",
            choices: [
                {
                    name: "Off",
                    value: "off"
                },
                {
                    name: "Song",
                    value: "song"
                },
                {
                    name: "Queue",
                    value: "queue"
                }
            ],
            required: true
        }
    ],
    run: async (client, interaction, args) => {

        const opcion = interaction.options.getString("mode")

      const queue = client.distube.getQueue(interaction)
      if (!queue) return interaction.reply(`:x: | There are no songs in the queue!`)
      let mode = null
      switch (opcion) {
        case 'off':
          mode = 0
          break
        case 'song':
          mode = 1
          break
        case 'queue':
          mode = 2
          break
      }
      mode = queue.setRepeatMode(mode)
      mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off'
      interaction.reply({content: `:white_check_mark: | Loop has set to: \`${mode}\``}).catch(err => {
          return interaction.reply({content: `An error has occurred: \`${err}\``})
      })
    }
  }
  