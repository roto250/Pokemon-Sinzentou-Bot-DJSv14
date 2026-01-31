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

## 機能説明
### 1. ポケモン図鑑表示（/pokedex）
#### 概要
- 指定したポケモンの日本語名、説明文、分類、画像を埋め込みメッセージで表示します。
- 入力は日本語・英語どちらでも対応（`pokemon_jp_en.json` を使用）。
<img width="439" height="222" alt="image" src="https://github.com/user-attachments/assets/82ba66eb-0345-4050-9e9a-8b726d8e06a0" />


### 2. ポケモン種族値表示（/pokemon-battle）
#### 概要
- 指定したポケモンの種族値（HP・攻撃・防御・特攻・特防・素早さ）、タイプ、特性を表示します。
- 日本語・英語どちらの名前でも検索可能。
<img width="481" height="328" alt="image" src="https://github.com/user-attachments/assets/c363ea42-bc95-4470-a238-871c23aca34a" />

### 3. ランダムポケモン表示（/ranpoke）
#### 概要
- ランダムでポケモンを1匹表示します。
- 身長・体重・タイプ・特性などを確認可能。
- おみくじ感覚でポケモンを楽しめます。
<img width="419" height="245" alt="image" src="https://github.com/user-attachments/assets/644dfd82-0323-44d0-b203-ee95e9f082f1" />

### 4. 埋め込みメッセージ作成機能（/umekomi）
スラッシュコマンドを使って、  
Discord の埋め込みメッセージ（Embed）を簡単に作成できます。
#### 概要
- タイトル・説明文・画像などを自由に設定可能
- 入力された項目のみ Embed に反映されます
- 説明文では `\n` を使用した改行に対応しています
<img width="424" height="132" alt="image" src="https://github.com/user-attachments/assets/850e6885-3178-4d26-91c8-7a70f67c3383" />


#### 使用できる主な項目
- タイトル
- 説明文
- 画像URL
- サムネイルURL
- 色（例：`#ff0000`）
- 著者名 / 著者アイコン / 著者URL
- フッター / フッターアイコン

### 5. スレッド作成時の自動通知機能
指定したチャンネルでスレッドが作成された際に、  アナウンス用チャンネルへ自動で通知を送信します。

#### 概要
- スレッド作成を検知して自動通知
- スレッドタイトル・作成者・内容・URL を Embed で表示
- チャンネルごとに通知内容や色を設定可能
- 設定内容は JSON ファイルに保存されます

### 6. スレッド通知設定の管理機能
スレッド通知の設定をコマンドで管理できます。
#### 主な機能
- 通知設定の追加
- 現在の設定一覧の表示
- 不要になった設定の削除
※ 管理用途のため、一部の表示は自分にのみ表示されます。

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
