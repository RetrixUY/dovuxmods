const axios = require('axios');
const Discord = require('discord.js');
const numeral = require('numeral');
module.exports = {
    name: "mods",
    /** @type Discord.ApplicationCommandData */
    commandData: {
        name: "mods",
        description: "Gets the list of channels where a user is mod",
        options: [
            {
                description: "Twitch user",
                name: "user",
                type: 'STRING',
                required: true
            },
            {
                description: "use this to limit the channels quantity if the message overpass the discord lenght limit",
                name: "limit",
                type: 'INTEGER',
                required: false
            }
        ],
        defaultPermission: true
    },
    /** @param {Discord.CommandInteraction} interaction*/
    async commandRun(interaction){
        await interaction.defer()
        let user = interaction.options.get("user").value;
        console.log(`Requested ${user} moderated channels`)
        let limit = interaction.options.has("limit") ? interaction.options.get("limit").value : 1000;
        axios.get(`https://modlookup.3v.fi/api/user-v3/${user}`).then(
            (response) => {
                let reply = `User: **${response.data.user}** Moderates the following channels:\n`
                response.data.channels.sort((a,b)=>{
                    if (a.followers>b.followers) return -1
                    if (a.followers<b.followers) return 1
                    return 0
                }).slice(0,limit).forEach((channel) => {
                    reply += `\n➜${channel.name} (${numeral(channel.followers).format('0.0a')} Followers)`
                })
                interaction.editReply(reply).then(()=> console.log(`Replied ${user} moderated channels`)).catch((err)=>{
                    interaction.editReply(err.message)
                });
            },(err) => {interaction.editReply("Error: "+ err)}
        ).catch((err) => {interaction.editReply("Error: "+err)})
    }
}