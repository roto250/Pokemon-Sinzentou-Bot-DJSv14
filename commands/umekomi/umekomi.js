const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('umekomi')
    .setDescription('埋め込みメッセージを作成します。')
    .addStringOption(option => option.setName('title').setDescription('タイトル'))
    .addStringOption(option => option.setName('description').setDescription('説明'))
    .addStringOption(option => option.setName('image').setDescription('画像URL'))
    .addStringOption(option => option.setName('thumbnail').setDescription('サムネイルURL'))
    .addStringOption(option => option.setName('color').setDescription('色（例: #ff0000）'))
    .addStringOption(option => option.setName('author').setDescription('著者名'))
    .addStringOption(option => option.setName('authoricon').setDescription('著者アイコンURL'))
    .addStringOption(option => option.setName('authorurl').setDescription('著者URL'))
    .addStringOption(option => option.setName('footer').setDescription('フッター'))
    .addStringOption(option => option.setName('footericon').setDescription('フッターアイコンURL')),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle(interaction.options.getString('title') || undefined)
      .setDescription((interaction.options.getString('description') || '').replace(/\\n/g, '\n'))
      .setImage(interaction.options.getString('image') || undefined)
      .setThumbnail(interaction.options.getString('thumbnail') || undefined);

    const color = interaction.options.getString('color');
    if (color && /^#?[0-9A-Fa-f]{6}$/.test(color)) {
      embed.setColor(color.startsWith('#') ? color : `#${color}`);
    }

    const author = interaction.options.getString('author');
    if (author) {
      embed.setAuthor({
        name: author,
        iconURL: interaction.options.getString('authoricon') || undefined,
        url: interaction.options.getString('authorurl') || undefined
      });
    }

    const footer = interaction.options.getString('footer');
    if (footer) {
      embed.setFooter({
        text: footer,
        iconURL: interaction.options.getString('footericon') || undefined
      });
    }

    await interaction.reply({ embeds: [embed] });
  }
};
