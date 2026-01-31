require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const basePath = path.join(__dirname, 'commands');

for (const folder of fs.readdirSync(basePath)) {
  const files = fs.readdirSync(path.join(basePath, folder)).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const command = require(path.join(basePath, folder, file));
    if (command.data) {
      commands.push(command.data.toJSON());
    }
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log('Commands deployed successfully');
  } catch (e) {
    console.error(e);
  }
})();
