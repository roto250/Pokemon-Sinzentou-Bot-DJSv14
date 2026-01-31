const fs = require('node:fs');
const path = require('node:path');

module.exports = (client) => {
  const basePath = path.join(__dirname, '../commands');

  for (const folder of fs.readdirSync(basePath)) {
    const files = fs
      .readdirSync(path.join(basePath, folder))
      .filter(f => f.endsWith('.js'));

    for (const file of files) {
      const command = require(path.join(basePath, folder, file));
      if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
      }
    }
  }
};
