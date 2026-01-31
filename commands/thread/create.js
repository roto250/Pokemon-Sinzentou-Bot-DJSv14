const { SlashCommandBuilder, ChannelType } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce_thread_create')
    .setDescription('スレッド通知機能の登録コマンドです。')
    .addChannelOption(option =>
      option
        .setName('announce_channel')
        .setDescription('お知らせチャンネル')
        .setRequired(true)
    )
    .addChannelOption(option =>
      option
        .setName('target_channel')
        .setDescription('スレッドチャンネル')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('channel_name')
        .setDescription('データの名前')
        .setRequired(true)
    )
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('通知用ロール')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('color')
        .setDescription('埋め込みの色（HTMLカラーコード）')
        .setRequired(false)
    ),

  async execute(interaction) {
    const announceChannel = interaction.options.getChannel('announce_channel');
    const targetChannel = interaction.options.getChannel('target_channel');

    if (!announceChannel || !targetChannel) {
      return interaction.reply({ content: 'チャンネルが見つかりません。', ephemeral: true });
    }

    if (announceChannel.type !== ChannelType.GuildText) {
      return interaction.reply({ content: 'テキストチャンネルを指定して下さい。', ephemeral: true });
    }

    const channelName = interaction.options.getString('channel_name');
    const role = interaction.options.getRole('role')?.id || null;

    const colorInput = interaction.options.getString('color');
    const colorRegex = /^[0-9a-fA-F]{6}$/;

    if (colorInput && !colorRegex.test(colorInput)) {
      return interaction.reply({ content: '色は「HTMLカラーコード」で指定してください。', ephemeral: true });
    }

    const color = colorInput || '000000';
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

    const newData = {
      name: channelName,
      serverID,
      announceChannelID: announceChannel.id,
      targetChannelID: targetChannel.id,
      role,
      color
    };

    channelsData.push(newData);

    try {
      fs.writeFileSync(filePath, JSON.stringify(channelsData, null, 2));
      await interaction.reply(`「${channelName}」を保存しました。`);
    } catch {
      await interaction.reply({ content: '保存に失敗しました。', ephemeral: true });
    }
  }
};
