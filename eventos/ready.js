const client = require("../index.js")

module.exports = client => {

    console.log(`Bot succesfully conected`.green)

    const A= [
    {name:`${client.users.cache.size} Usuarios`, type:`WATCHING`}, 
    {name:`${client.guilds.cache.size} Servidores`, type:`WATCHING`},
    {name: `Twitch`, type: `STREAMING`, url: "https://www.twitch.tv/zilverk"},
    ];
    
    setInterval(() => {
    let activ=A[Math.floor(Math.random() * A.length)]
   
    function presence(){
    client.user.setPresence( {
    activities:[activ],
    status:'online'
    })}
    presence()
    }, 3500);
}