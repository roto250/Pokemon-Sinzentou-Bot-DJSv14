const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ranpoke')
    .setDescription('ポケモンのおみくじです。'),

  async execute(interaction) {
    try {
      const id = Math.floor(Math.random() * 1008) + 1;
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const p = res.data;

      let typeText = '';
      for (const t of p.types) {
        if (t.type.name === 'fire') typeText += 'ほのお ';
        else if (t.type.name === 'water') typeText += 'みず ';
        else if (t.type.name === 'grass') typeText += 'くさ ';
        else if (t.type.name === 'electric') typeText += 'でんき ';
        else if (t.type.name === 'ice') typeText += 'こおり ';
        else if (t.type.name === 'fighting') typeText += 'かくとう ';
        else if (t.type.name === 'poison') typeText += 'どく ';
        else if (t.type.name === 'ground') typeText += 'じめん ';
        else if (t.type.name === 'flying') typeText += 'ひこう ';
        else if (t.type.name === 'psychic') typeText += 'エスパー ';
        else if (t.type.name === 'bug') typeText += 'むし ';
        else if (t.type.name === 'rock') typeText += 'いわ ';
        else if (t.type.name === 'ghost') typeText += 'ゴースト ';
        else if (t.type.name === 'dragon') typeText += 'ドラゴン ';
        else if (t.type.name === 'dark') typeText += 'あく ';
        else if (t.type.name === 'steel') typeText += 'はがね ';
        else if (t.type.name === 'fairy') typeText += 'フェアリー ';
        else typeText += t.type.name + ' ';
      }

      const abilities = p.abilities
        .map(a => a.ability.name)
        .join(', ');

      const embed = new EmbedBuilder()
        .setColor(0xfca903)
        .setTitle(p.name)
        .setThumbnail(p.sprites.front_default)
        .addFields(
          { name: '身長', value: `${p.height / 10} m`, inline: true },
          { name: '体重', value: `${p.weight / 10} kg`, inline: true },
          { name: 'タイプ', value: typeText.trim() },
          { name: '特性', value: abilities }
        );

      await interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
      interaction.reply('現在メンテナンス中です。');
    }
  },
};
