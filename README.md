# ポケモン親善島Bot  
[![Discord](https://img.shields.io/badge/Discord-Join-blue?logo=discord&logoColor=white)](https://discord.com/servers/pokemonqin-shan-dao-1039799815996968970)

ポケモン親善島 Discord サーバーで使用している Bot のソースコードです。  
※ 本リポジトリは **一時的に公開**しています。

本プロジェクトは、ポケモン親善島 Discord サーバーの運営を目的として開発された Bot です。
**ポケモン公式とは無関係の非公式ファンプロジェクト**です。

## 開発環境・使用方法
### 開発環境
本プロジェクトは、以下の環境で開発および動作確認を行っています。

- **Node.js**：18 以上
- **discord.js**：v14 系
- **axios**
- Discord API  
- PokeAPI（https://pokeapi.co/）


### 使用方法

#### 1. 事前準備
- Discord Developer Portal にて Bot を作成してください  
- Bot Token / Application ID / Guild ID を取得してください

#### 2. 環境変数の設定
プロジェクト直下に `.env` ファイルを作成し、以下を設定してください。

```env
TOKEN=YOUR_BOT_TOKEN
CLIENT_ID=YOUR_APPLICATION_ID
GUILD_ID=YOUR_GUILD_ID
```

### 3. インストール
```
npm init -y
npm install discord.js axios
```

### 4. スラシュコマンドの登録・Botの起動
```
node deploy-commands.js
```
```
node index.js
```

## クレジット・権利表記
本プロジェクトは非公式のファンコミュニティによるものであり、  
任天堂、株式会社ポケモン、Creatures Inc.、GAME FREAK inc.  
およびその他の公式団体とは一切関係ありません。

「ポケモン（Pokémon）」および関連する名称・キャラクターは、  
任天堂・クリーチャーズ・ゲームフリークの登録商標です。

本プロジェクトは、PokeAPI（https://pokeapi.co/）を利用しています。

本プロジェクトは discord.js v14 を使用しています。  
一部のコード構成および設計は、Discord.js 公式ドキュメント・公式ガイドを参考にしています。

- Discord.js 公式ドキュメント  
  https://discord.js.org/
- Discord.js 公式ガイド  
  https://discordjs.guide/

なお、以下の機能・実装は本プロジェクト独自の実装です。

- `commands` フォルダ内のすべてのコード  
- `src/thread.js`（スレッド作成時の通知処理）


それ以外の共通的な初期化処理や構成については、  
公式ガイドのサンプル構成を参考にしています。

本リポジトリ内のオリジナルコードを除き、  
各ライブラリ・サービスの権利はそれぞれの権利者に帰属します。
