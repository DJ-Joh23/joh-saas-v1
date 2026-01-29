# Joh SaaS - 販売プラットフォーム構築

## 方針：「お店」の外側を作る
- ❌ アプリ機能の開発（別タスク）
- ❌ 商品管理機能
- ✅ ランディングページ（LP）
- ✅ 決済システム
- ✅ Vercel インフラ開通

## Phase 1: Vercel インフラの開通（Root Directory 修正）
- [ ] vercel.json に rootDirectory: "client" を指定
- [ ] buildCommand を npm run build に修正
- [ ] outputDirectory を dist に修正
- [ ] GitHub にコミット・プッシュ
- [ ] Vercel で再ビルド実行
- [ ] デプロイ URL でアプリが表示されることを確認

## Phase 2: アプリ機能の削除（Dashboard.tsx の上書き）
- [ ] Dashboard.tsx を空のページまたはシンプルなページに置き換え
- [ ] せどり管理機能を完全に削除
- [ ] 商品リスト表示を削除

## Phase 3: LP の作成（Home.tsx を販売ページに変更）
- [ ] ヒーロー画像/セクション（アプリの紹介）
- [ ] 機能説明セクション
- [ ] 価格表示セクション（490円）
- [ ] 「申し込む」ボタン（Stripe 決済へ）
- [ ] シンプルで効果的なデザイン

## Phase 4: 決済導線の確保（Stripe ボタン設置）
- [ ] LP の「申し込む」ボタンに Stripe 決済リンクを埋め込み
- [ ] 日本語決済画面への遷移確認
- [ ] 決済フロー全体の動作確認

## Phase 5: 最終デプロイと公開
- [ ] 全ページの動作確認
- [ ] Vercel への最終デプロイ
- [ ] 公開 URL の確認
- [ ] 独自ドメイン（joh-design.com）の接続確認
