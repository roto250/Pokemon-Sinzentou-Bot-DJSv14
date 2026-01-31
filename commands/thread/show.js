const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce_thread_show')
    .setDescription('スレッド通知機能の保存データを表示します。'),

  async execute(interaction) {
    const filePath = path.join(__dirname, 'channels.json');
    let allChannelsData = [];

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      allChannelsData = JSON.parse(fileContent);
    } catch (error) {
      console.error('読み込みエラー:', error);
      return interaction.reply({
        content: '現在メンテナンス中です。',
        ephemeral: true
      });
    }

    const serverData = allChannelsData.filter(
      data => data.serverID === interaction.guild.id
    );

    if (serverData.length === 0) {
      return interaction.reply({
        content: 'データが保存されていません。登録用コマンドよりデータ登録をしてください。',
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setTitle('保存されているデータ')
      .setColor(0x000000)
      .addFields(
        serverData.map(data => ({
          name: data.name,
          value:
            `**送信先:** <#${data.announceChannelID}>\n` +
            `**対象チャンネル:** <#${data.targetChannelID}>\n` +
            `**ロール:** ${data.role ? `<@&${data.role}>` : 'なし'}\n` +
            `**色:** #${data.color}`
        }))
      );

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  },
};
