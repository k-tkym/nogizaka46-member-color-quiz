# 乃木坂46 サイリウムクイズ

乃木坂46のメンバーごとの公式サイリウムカラーを当てるクイズアプリです。  
3期生から最新の6期生までのデータに対応しています。

## LIVE DEMO

GitHub Pages: https://k-tkym.github.io/nogizaka46-member-color-quiz/

## 主な機能

- クイズモード: 選択肢から選ぶ「イージー」と、色を選んで回答する「ハード」の2種類
- 期別フィルタ: 出題されるメンバーの期を選択可能
- メンバー一覧フィルタ: 41枚目シングルの「選抜 / アンダー」で一覧を切り替え可能
- レスポンシブ対応: PC・スマホ両方のブラウザで快適に動作

## 技術スタック

- Frontend: React (Vite)
- Styling: Tailwind CSS
- Icons: Lucide React
- Deployment: GitHub Pages

## Dockerでの起動

```bash
# 初回ビルド + 起動
docker compose up --build

# 2回目以降の起動
docker compose up
```

ブラウザで `http://localhost:5173` にアクセスしてください。

テストとビルド確認も Docker 経由で実行できます。

```bash
docker compose run --rm app sh -lc "npm test && npm run build"
```

停止する場合:

```bash
docker compose down
```

## 免責事項

- 本アプリは乃木坂46の非公式ファンアプリです。
- 使用しているデータは公開時点の情報に基づきますが、正確性を保証するものではありません。

© 2026 k-tkym
