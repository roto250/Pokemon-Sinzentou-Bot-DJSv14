const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const pokemonNames = require('./pokemon_jp_en.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pokemon-battle')
    .setDescription('指定したポケモンの種族値を表示します。')
    .addStringOption(option =>
      option
        .setName('ポケモンの名前')
        .setDescription('ポケモンの名前を入力してください。')
        .setRequired(true)
    ),

  async execute(interaction) {
    const name = interaction.options.getString('ポケモンの名前').toLowerCase();
    const enName = pokemonNames[name] || name;

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${enName}`
      );

      const p = response.data;

      let statText = '';
      for (const s of p.stats) {
        if (s.stat.name === 'hp') statText += `HP: ${s.base_stat}\n`;
        if (s.stat.name === 'attack') statText += `こうげき: ${s.base_stat}\n`;
        if (s.stat.name === 'defense') statText += `ぼうぎょ: ${s.base_stat}\n`;
        if (s.stat.name === 'special-attack') statText += `とくこう: ${s.base_stat}\n`;
        if (s.stat.name === 'special-defense') statText += `とくぼう: ${s.base_stat}\n`;
        if (s.stat.name === 'speed') statText += `すばやさ: ${s.base_stat}\n`;
      }

      const typeText = p.types
        .map(t => pokemonNames[t.type.name] || t.type.name)
        .join(', ');

      const abilityText = p.abilities
        .map(a => pokemonNames[a.ability.name] || a.ability.name)
        .join(', ');

      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`No.${p.id} | ${p.name}`)
        .setThumbnail(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`
        )
        .setDescription(`**種族値**\n${statText}`)
        .addFields(
          { name: 'タイプ', value: typeText },
          { name: '特性', value: abilityText }
        );

      await interaction.reply({ embeds: [embed] });
    } catch (e) {
      await interaction.reply('ポケモンの名前はあっていますか？\n※スカバイのポケモンは未対応です。');
    }
  },
};
