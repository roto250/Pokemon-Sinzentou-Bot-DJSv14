const { Client, GatewayIntentBits, Collection } = require('discord.js');

module.exports = () => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  client.commands = new Collection();
  return client;
};
