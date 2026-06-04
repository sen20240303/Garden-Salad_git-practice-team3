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

> **注意:** `$ff-en-satisfy` と `$ff-en-reross` は英字向けフォントです。日本語の見出し・本文には `$ff` / `$ff-jp` を使ってください。

---

## 📐 SCSS共通（`@include font()` / `rm()`）

Figma の数値（px）をそのまま渡して CSS に変換する仕組みです。定義は `assets/scss/global/_mixin.scss`（font）と `_function.scss`（rm）にあります。

各 SCSS ファイルの先頭で、次のように global を読み込んでから使います。

```scss
@use "../../global" as *; // project 配下の場合（階層に応じてパスを調整）
```

### `@include font()` の使い方

タイポグラフィ（サイズ・太さ・行間・字間）を一括指定するミックスインです。**引数はすべて Figma の px 想定で、単位は付けません。**

```scss
.p-test__title {
  @include font(50, 700, 47, 0);
  font-family: $ff-en-reross; // font-family は別途指定
}
```

| 順番 | 引数 | 例 | 出力される内容 |
|------|------|-----|----------------|
| 1 | フォントサイズ（px） | `50` | `font-size`（PC は `max(rem, サイズ×0.8px)`、SP は `rem` のみ） |
| 2 | `font-weight` | `700` | 太さ |
| 3 | 行の高さ（px） | `47` | `line-height: 47 ÷ 50` → 比率（**0.94**） |
| 4 | 字間（px） | `0` | `letter-spacing`（`em` 換算） |

**ポイント**

- 行高・字間を使うときは、**第1引数（サイズ）も必ず渡す**（計算で `$size` を使うため）。
- 不要な項目だけ省略したい場合は `@include font(50);` のように、必要な引数だけ渡せます。
- `font-family` はミックスインに含まれないため、`$ff` などを **別行で指定**してください。

### `rm()` の使い方

余白・幅など、カンプの **px 数値を `rem` に変換**する関数です。

```scss
.p-test {
  padding-block: rm(120);
  @include mq(sp) {
    padding-block: rm(70); // SP だけ別の値にする例
  }
}

.p-test__text-wrap {
  width: min(rm(400), 100%); // 400px 相当まで、親幅は超えない
}
```

| 記法 | 意味 |
|------|------|
| `rm(120)` | `calc(120 / 16 * 1rem)` → **7.5rem**（120px 相当） |
| `rm(40)` | **2.5rem**（40px 相当） |

**ポイント**

- 引数に **単位は付けない**（`rm(120)` が正しい、`rm(120px)` は不可）。
- SP だけ変えるときは `@include mq(sp) { ... }` の中で別の `rm()` を書きます。

**関連関数（同じ `_function.scss`）**

| 関数 | 用途の目安 |
|------|------------|
| `px($arg)` | メディアクエリの境界値など、固定 `px` が必要なとき |
| `vw($arg)` | PC カンプ（1440px）基準の画面幅連動 |
| `vw-sp($arg)` | SP カンプ（375px）基準の画面幅連動 |

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
