const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce_thread_delete')
    .setDescription('スレッド通知機能の削除コマンドです。')
    .addStringOption(option =>
      option
        .setName('channel_name')
        .setDescription('削除するデータの名前')
        .setRequired(true)
    ),

  async execute(interaction) {
    const channelName = interaction.options.getString('channel_name');
    const serverID = interaction.guild.id;

    const filePath = path.join(__dirname, 'channels.json');
    let channelsData = [];

    if (fs.existsSync(filePath)) {
      try {
        channelsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch {
        channelsData = [];
      }
    }

    const index = channelsData.findIndex(data =>
      data.name === channelName && data.serverID === serverID
    );

    if (index === -1) {
      return interaction.reply({
        content: '設定が見つかりませんでした。',
        ephemeral: true
      });
    }

    channelsData.splice(index, 1);

    try {
      fs.writeFileSync(filePath, JSON.stringify(channelsData, null, 2));
      await interaction.reply(`「${channelName}」を削除しました。`);
    } catch {
      await interaction.reply({
        content: '削除に失敗しました。',
        ephemeral: true
      });
    }
  }
};
