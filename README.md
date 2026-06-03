<<<<<<< HEAD
# 🚀 共同コーディングプロジェクト作業ガイド

メンバーのみなさん、お疲れ様です！
円滑に開発を進めるための共通ルールと、フォント・アイコンなどの使い方をまとめました。作業前に一読をお願いします！

---

## 📁 フォルダ構成

```
garden-salad/
├── index.html
└── assets/
    ├── css/
    │   ├── style.css          # コンパイル済みCSS（直接編集しない）
    │   └── lib/
    │       └── swiper-bundle.min.css
    ├── img/                   # 画像ファイル格納場所
    ├── js/
    │   ├── main.js            # メインJS
    │   ├── lib/
    │   │   └── swiper-bundle.min.js
    │   └── parts/             # 共通ユーティリティJS
    │       ├── _fadeIn.js
    │       ├── _loading.js
    │       ├── _smooth.js
    │       └── _to-top.js
    └── scss/
        ├── style.scss
        ├── foundation/        # reset・base
        ├── global/            # 変数・mixin・関数
        ├── layout/            # ヘッダー・フッター・inner等
        └── object/
            ├── component/     # 汎用パーツ
            ├── project/       # ページ固有パーツ
            └── utility/       # ユーティリティクラス
```

---

## 🛠️ 事前に入っている共通設定

ホスト側で `index.html` に以下の設定を完了しています。各自で追加で読み込む必要はありません。

| # | ライブラリ | 詳細 |
|---|-----------|------|
| 1 | **Google Fonts** | `Noto Sans JP`、`Satisfy` |
| 2 | **Adobe Fonts** | `Reross Quadratic`（`reross-quadratic`） |
| 3 | **Font Awesome v6.5.1** | アイコン用CDN |
| 4 | **GSAP 3.12.5 / ScrollTrigger** | アニメーション用 |
| 5 | **Swiper** | スライダー用（ローカルファイルとして読み込み済み） |

---

## 🎨 フォントの指定方法（SCSS変数）

`assets/scss/global/_variables.scss` に以下の変数を用意しています。カンプの指定に合わせて使い分けてください。

| 変数名 | フォント | 用途 |
|--------|---------|------|
| `$ff` | Noto Sans JP | 全体・日本語（bodyデフォルト） |
| `$ff-jp` | Noto Sans JP | 日本語専用 |
| `$ff-en-satisfy` | Satisfy | 英語（手書き風・Google Fonts） |
| `$ff-en-reross` | Reross Quadratic | 英語（Adobe Fonts） |

```scss
// 使用例
.title {
  font-family: $ff-en-satisfy;
}
```

---

## 🌟 Font Awesome（アイコン）の使い方

HTMLに `<i>` タグを記述するだけでアイコンが表示されます。

### 1. アイコンの探し方

1. [Font Awesome 公式サイト](https://fontawesome.com/search?o=r&m=free) の検索窓（英語）で探します。
2. 左メニューの **[Free]** にチェックを入れて、無料版のアイコンを絞り込みます。

### 2. コードの書き方

使いたいアイコンをクリックすると、以下のようなコードが表示されるので、コピーしてHTMLの表示させたい場所に貼り付けます。

```html
<i class="fa-solid fa-star"></i>

<i class="fa-solid fa-magnifying-glass"></i>
```

---

## ⚡ 用意済みJSユーティリティ

`assets/js/parts/` に以下のスクリプトが用意されています。必要に応じて `main.js` からインポートして使用してください。

| ファイル | 機能 |
|---------|------|
| `_fadeIn.js` | フェードインアニメーション |
| `_loading.js` | ローディング画面 |
| `_smooth.js` | スムーススクロール |
| `_to-top.js` | トップへ戻るボタン |

---

## ✏️ 作業上の注意

- `assets/css/style.css` は直接編集しないでください。SCSSをコンパイルして生成されるファイルです。
- 画像は `assets/img/` に格納してください。
- SCSSを追加する場合は `assets/scss/object/project/` 配下に `_p-セクション名.scss` のファイルを作成し、`style.scss` でインポートしてください。
=======
# Garden-Salad_git-practice-team3
>>>>>>> 2b95d171de3de398671a03daa11cb8b2646ccb4c
