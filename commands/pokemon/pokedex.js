const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const pokemonNames = require('./pokemon_jp_en.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pokedex')
    .setDescription('指定したポケモンの情報を表示します')
    .addStringOption(option =>
      option
        .setName('ポケモンの名前')
        .setDescription('ポケモンの名前を入力してください。')
        .setRequired(true)
    ),

  async execute(interaction) {
    const inputName = interaction.options.getString('ポケモンの名前').toLowerCase();
    const englishName = pokemonNames[inputName] || inputName;

    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${englishName}`
      );

      const data = res.data;
      const jpName = data.names.find(n => n.language.name === 'ja')?.name;
      const flavor = data.flavor_text_entries.find(
        f => f.language.name === 'ja'
      )?.flavor_text;
      const genus = data.genera.find(g => g.language.name === 'ja')?.genus;

      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`No.${data.id} | ${jpName}`)
        .setDescription(flavor || '説明なし')
        .setThumbnail(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
        )
        .addFields({ name: '分類', value: genus || '不明', inline: true });

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      interaction.reply(
        'ポケモンの名前はあっていますか？\n※スカバイのポケモンは未対応です。'
      );
    }
  },
};
