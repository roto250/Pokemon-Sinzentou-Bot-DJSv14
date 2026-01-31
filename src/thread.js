const fs = require('node:fs');
const path = require('node:path');
const { EmbedBuilder } = require('discord.js');

const THREAD_FILE = path.resolve('./commands/thread/channels.json');

function readThreadJson() {
  if (!fs.existsSync(THREAD_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(THREAD_FILE, 'utf8'));
  } catch {
    return [];
  }
}

module.exports = (client) => {
  client.on('threadCreate', async (thread) => {
    if (!thread.guild) return;

    const list = readThreadJson();
    const data = list.find(v =>
      v.serverID === thread.guild.id &&
      v.targetChannelID === thread.parentId
    );
    if (!data) return;

    try {
      const channel = await thread.guild.channels.fetch(data.announceChannelID);
      const member = await thread.guild.members.fetch(thread.ownerId);
      const msg = (await thread.messages.fetch({ limit: 1 })).first();

      const embed = new EmbedBuilder()
        .setTitle(data.name)
        .setColor(parseInt(data.color, 16))
        .setAuthor({
          name: member.user.tag,
          iconURL: member.user.displayAvatarURL(),
        })
        .setDescription(
          `タイトル\n${thread.name}\n\n内容\n${msg?.content ?? 'なし'}\n\n${thread.url}`
        )
        .setTimestamp();

      if (data.role) await channel.send(`<@&${data.role}>`);
      await channel.send({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  });
};
