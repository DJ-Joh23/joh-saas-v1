# Joh SaaS V1 - 完全なSaaS土台アプリケーション

**Joh SaaS V1** は、Next.js、Supabase、Stripeを使用した、プロダクションレディなSaaS土台アプリケーションです。ユーザー認証、使用回数制限、決済処理がすべて統合されています。

## 🚀 主な機能

### 認証システム
- **Supabase認証**: 安全なユーザー認証
- **セッション管理**: 自動的なセッション管理
- **ユーザープロフィール**: ユーザー情報の管理

### 使用回数制限
- **無料プラン**: 1日10回まで使用可能
- **Proプラン**: 無制限に使用可能
- **日次リセット**: 毎日自動的に使用回数がリセット
- **リアルタイム表示**: 残り使用回数をダッシュボードに表示

### 決済処理
- **Stripe統合**: 安全な決済処理
- **Proアップグレード**: ワンクリックでProプランにアップグレード
- **購読管理**: 購読ステータスの自動管理
- **Webhook処理**: 支払い成功時の自動処理

### ダッシュボード
- **ユーザー情報表示**: 登録情報の表示
- **使用統計**: 日々の使用回数を視覚的に表示
- **プラン管理**: 現在のプランと購読ステータスを表示
- **アップグレードボタン**: Proプランへの簡単なアップグレード

---

## 📋 技術スタック

| レイヤー | 技術 |
|---------|------|
| **フロントエンド** | React 19, TypeScript, Tailwind CSS 4 |
| **バックエンド** | Express 4, tRPC 11, Node.js |
| **データベース** | MySQL/TiDB, Drizzle ORM |
| **認証** | Supabase Auth, Manus OAuth |
| **決済** | Stripe API |
| **ホスティング** | Manus |

---

## 🛠️ クイックスタート

### 前提条件

- Node.js 22.13.0以上
- pnpm 10.4.1以上
- Supabaseアカウント
- Stripeアカウント

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/DJ-Joh23/joh-saas-v1.git
cd joh-saas-v1

# 依存パッケージをインストール
pnpm install

# 環境変数を設定
cp .env.example .env.local
# .env.local を編集して必要な情報を入力

# データベースマイグレーション
pnpm db:push

# 開発サーバーを起動
pnpm dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

---

## 📚 詳細なセットアップガイド

環境変数の設定方法やトラブルシューティングについては、[SETUP_GUIDE.md](./SETUP_GUIDE.md) をご覧ください。

---

## 📁 プロジェクト構造

```
joh-saas-v1/
├── client/                 # フロントエンド（React）
│   ├── src/
│   │   ├── pages/         # ページコンポーネント
│   │   │   ├── Home.tsx   # ホームページ
│   │   │   └── Dashboard.tsx # ダッシュボード
│   │   ├── components/    # 再利用可能なコンポーネント
│   │   ├── lib/           # ユーティリティ関数
│   │   └── App.tsx        # ルーティング設定
│   └── public/            # 静的ファイル
├── server/                # バックエンド（Express + tRPC）
│   ├── routers.ts         # tRPCルーター定義
│   ├── db.ts              # データベースクエリ関数
│   ├── stripe.ts          # Stripe統合
│   └── _core/             # フレームワークコア
├── drizzle/               # データベーススキーマ
│   └── schema.ts          # テーブル定義
├── shared/                # 共有定数・型
└── package.json           # 依存パッケージ
```

---

## 🔑 主要なファイル説明

### `drizzle/schema.ts`
データベーススキーマを定義します。以下の3つのテーブルが含まれています：

- **users**: ユーザー情報
- **subscriptions**: 購読情報（プラン、Stripe顧客ID等）
- **usageLog**: 使用回数トラッキング（ユーザー、日付、回数）

### `server/db.ts`
データベースクエリ関数を定義します：

- `getSubscription()`: 購読情報を取得
- `getTodayUsage()`: 本日の使用回数を取得
- `incrementUsage()`: 使用回数をインクリメント
- `canUseFeature()`: 使用可能かどうかを判定
- `getUserStats()`: ユーザーの統計情報を取得

### `server/stripe.ts`
Stripe APIとの連携を処理します：

- `createCheckoutSession()`: チェックアウトセッションを作成
- `createCustomer()`: Stripe顧客を作成
- `cancelSubscription()`: 購読をキャンセル

### `server/routers.ts`
tRPCエンドポイントを定義します：

- `auth.me`: 現在のユーザー情報
- `subscription.getStatus`: 購読ステータス
- `subscription.createCheckout`: チェックアウトセッション作成
- `usage.canUse`: 使用可能かどうかを確認
- `usage.increment`: 使用回数をインクリメント

### `client/src/pages/Dashboard.tsx`
ユーザーダッシュボードを表示します：

- ユーザー情報の表示
- 使用回数の表示（プログレスバー付き）
- Proアップグレードボタン
- 購読ステータスの表示

---

## 🔄 ワークフロー

### ユーザーログイン
1. ホームページの「Sign In」をクリック
2. Supabase認証画面でログイン
3. ダッシュボードにリダイレクト

### 使用回数チェック
1. ユーザーが機能を使用しようとする
2. `usage.canUse` エンドポイントで使用可能かチェック
3. 使用可能な場合、`usage.increment` で使用回数をインクリメント

### Proアップグレード
1. ダッシュボードの「Upgrade to Pro」をクリック
2. `subscription.createCheckout` でStripeセッションを作成
3. Stripeチェックアウト画面にリダイレクト
4. 支払い完了後、`subscription.handleCheckoutSuccess` で購読を更新
5. ダッシュボードに戻り、Proプランが有効になったことを確認

---

## 🧪 テスト

```bash
# ユニットテストを実行
pnpm test

# テストをウォッチモードで実行
pnpm test --watch
```

---

## 📝 環境変数

必要な環境変数は以下の通りです。詳細は [SETUP_GUIDE.md](./SETUP_GUIDE.md) をご覧ください。

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabaseプロジェクトのエンドポイント | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase公開キー | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase管理者キー | `eyJhbGc...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe公開キー | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Stripeシークレットキー | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook署名 | `whsec_...` |
| `STRIPE_PRICE_ID` | Pro プランの Price ID | `price_...` |

---

## 🚀 デプロイ

このプロジェクトはManus上でホストされています。デプロイ方法については [SETUP_GUIDE.md](./SETUP_GUIDE.md) の「デプロイ方法」セクションをご覧ください。

---

## 📞 サポート

問題が発生した場合は、以下をご確認ください：

1. [SETUP_GUIDE.md](./SETUP_GUIDE.md) のトラブルシューティングセクション
2. ログファイル: `.manus-logs/devserver.log`
3. ブラウザのコンソールエラー

---

## 📄 ライセンス

MIT License - 詳細は [LICENSE](./LICENSE) をご覧ください。

---

## 🙏 謝辞

このプロジェクトは以下のオープンソースプロジェクトを使用しています：

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [tRPC](https://trpc.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Stripe](https://stripe.com/)
- [Supabase](https://supabase.com/)

---

**作成者**: Joh  
**最終更新**: 2026年1月27日
