require('dotenv').config();
const createClient = require('./src/client');
const loadCommands = require('./src/load-commands');
const registerInteractions = require('./src/interaction');
const registerThreadHandler = require('./src/thread');

const client = createClient();

loadCommands(client);
registerInteractions(client);
registerThreadHandler(client);

client.login(process.env.TOKEN);
