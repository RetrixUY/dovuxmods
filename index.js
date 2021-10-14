require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client(
    {
        intents: [
            'GUILDS',
            'GUILD_MESSAGES',
        ]
    }
)
const commands = new Map();
const loadComamnds = () => {
    fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach((file)=> {
    const command = require(`./commands/${file}`);
    console.log(`Command ${command.name} loaded.`);
    commands.set(command.name,command);
})}
loadComamnds();
const createCommand = async (guildId) => {
    let commandsData = [];
    for (const command of commands.values()){
        commandsData.push(command.commandData);
    }

    client.guilds.cache.get(guildId).commands.set(commandsData).then(()=> {
        console.log("Commands created in "+client.guilds.cache.get(guildId).name);
    });
}

client.on("interactionCreate",async (interaction = Discord.CommandInteraction) => {
    if (!interaction.applicationId == client.application.id) return;
    if (!interaction.isCommand) return;
    if (!commands.has(interaction.commandName)) return;
    try {
        commands.get(interaction.commandName).commandRun(interaction);
    }
    catch (error){
        console.log(error);
    }
})


client.login(token).then((value) =>{
        console.log("Connnected to "+client.guilds.cache.size+" Guilds:");
        console.log(client.guilds.cache.forEach(async (g)=>{
            await createCommand(g.id);
        }))
    }
)