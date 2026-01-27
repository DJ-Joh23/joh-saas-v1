# SaaS Platform - セットアップガイド

このドキュメントでは、Joh SaaS V1プロジェクトのセットアップ方法を詳しく説明します。

## 目次

1. [必要な準備](#必要な準備)
2. [環境変数の設定](#環境変数の設定)
3. [ローカル開発環境の構築](#ローカル開発環境の構築)
4. [デプロイ方法](#デプロイ方法)
5. [トラブルシューティング](#トラブルシューティング)

---

## 必要な準備

このプロジェクトを実行するには、以下のサービスのアカウントが必要です。

### 1. Supabase（認証・データベース）

Supabaseは、PostgreSQLベースのバックエンドサービスです。

**セットアップ手順：**

1. [Supabase](https://supabase.com) にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクト設定から以下の情報を取得：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Stripe（決済処理）

Stripeは、オンライン決済を処理するサービスです。

**セットアップ手順：**

1. [Stripe](https://stripe.com) にアクセスしてアカウントを作成
2. ダッシュボードから以下の情報を取得：
   - **Publishable Key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret Key** → `STRIPE_SECRET_KEY`
3. Webhook設定：
   - Webhook Endpoints を作成
   - イベント: `checkout.session.completed`, `invoice.payment_succeeded`
   - Signing Secret → `STRIPE_WEBHOOK_SECRET`
4. Product と Price を作成：
   - Product名: "Pro Plan"
   - Price: $9/月
   - Price ID → `STRIPE_PRICE_ID`

### 3. Manus OAuth（ユーザー認証）

Manus OAuthは、このプロジェクトのユーザー認証を担当します。

**セットアップ手順：**

1. Manus管理画面にアクセス
2. OAuth Application を作成
3. 以下の情報を取得：
   - **App ID** → `VITE_APP_ID`
   - **Owner Open ID** → `OWNER_OPEN_ID`
   - **Owner Name** → `OWNER_NAME`

---

## 環境変数の設定

### ステップ1: 環境変数ファイルの作成

プロジェクトルートに `.env.local` ファイルを作成します。

```bash
cp .env.example .env.local
```

### ステップ2: 各環境変数を設定

以下の環境変数を `.env.local` に設定してください。

#### Supabase関連

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**説明：**
- `NEXT_PUBLIC_SUPABASE_URL`: Supabaseプロジェクトのエンドポイント
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 公開用のAPIキー（ブラウザで使用）
- `SUPABASE_SERVICE_ROLE_KEY`: 管理者用キー（サーバーサイドのみ）

#### Stripe関連

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Su3JOHmah1XNqU8...
STRIPE_SECRET_KEY=sk_test_51Su3JOHmah1XNqU8...
STRIPE_WEBHOOK_SECRET=whsec_V56oV3x72leMbstYCsfND7DlSVkmX6m3
STRIPE_PRICE_ID=price_1Su3JOHmah1XNqU8ghVpMg9yW2aOoKm4pPgIF1DxPABrkk1jEk39Z232wJVfH7XVsO0ez7cX8rQetmvLi0hx1KKR0007kxBNVI
```

**説明：**
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: 公開用キー（ブラウザで使用）
- `STRIPE_SECRET_KEY`: シークレットキー（サーバーサイドのみ）
- `STRIPE_WEBHOOK_SECRET`: Webhook署名シークレット
- `STRIPE_PRICE_ID`: Pro プランの Price ID

#### フロントエンド設定

```env
VITE_FRONTEND_URL=http://localhost:3000
```

**説明：**
- `VITE_FRONTEND_URL`: フロントエンドのベースURL（Stripeのリダイレクト先）

---

## ローカル開発環境の構築

### ステップ1: 依存パッケージのインストール

```bash
pnpm install
```

### ステップ2: データベースマイグレーション

```bash
pnpm db:push
```

このコマンドで、データベーススキーマが自動的に作成されます。

### ステップ3: 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

### ステップ4: 動作確認

1. **ホームページ**: `http://localhost:3000`
   - ページが正常に表示されることを確認

2. **ログイン**: 「Sign In」ボタンをクリック
   - Manus OAuth ログイン画面が表示されることを確認

3. **ダッシュボード**: ログイン後、`http://localhost:3000/dashboard` にアクセス
   - ユーザー情報と使用回数が表示されることを確認

4. **Proアップグレード**: ダッシュボードの「Upgrade to Pro」ボタンをクリック
   - Stripe チェックアウト画面が表示されることを確認

---

## デプロイ方法

### Manus へのデプロイ

このプロジェクトはManus上でホストされています。

**デプロイ手順：**

1. すべての変更をコミット
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

2. GitHubにプッシュ
   ```bash
   git push origin main
   ```

3. Manus管理画面で「Publish」ボタンをクリック

---

## トラブルシューティング

### Q1: "STRIPE_SECRET_KEY is not set" エラーが表示される

**原因**: 環境変数が正しく設定されていません。

**解決方法**:
1. `.env.local` ファイルが存在することを確認
2. `STRIPE_SECRET_KEY` が正しく設定されていることを確認
3. 開発サーバーを再起動: `pnpm dev`

### Q2: ログインができない

**原因**: Manus OAuth設定に問題があります。

**解決方法**:
1. `VITE_APP_ID` が正しく設定されていることを確認
2. `OAUTH_SERVER_URL` が正しく設定されていることを確認
3. Manus管理画面でアプリケーション設定を確認

### Q3: データベースエラーが発生する

**原因**: データベースマイグレーションが完了していません。

**解決方法**:
1. `pnpm db:push` を実行
2. データベース接続情報を確認
3. ログを確認: `tail -f .manus-logs/devserver.log`

### Q4: Stripe決済テストができない

**原因**: テストカード情報が正しくありません。

**解決方法**:
1. [Stripe テストカード](https://stripe.com/docs/testing) を使用
2. テストモードで実行していることを確認
3. Webhook設定が正しいことを確認

---

## 機能説明

### 無料プラン（Free）

- **使用回数**: 1日10回まで
- **サポート**: コミュニティサポート
- **機能**: 基本機能のみ

### Proプラン

- **使用回数**: 無制限
- **サポート**: 優先サポート
- **機能**: すべての機能
- **価格**: $9/月

---

## API エンドポイント

### 認証関連

- `GET /api/trpc/auth.me` - 現在のユーザー情報を取得
- `POST /api/trpc/auth.logout` - ログアウト

### 購読関連

- `GET /api/trpc/subscription.getStatus` - 購読ステータスを取得
- `GET /api/trpc/subscription.getStats` - 購読統計を取得
- `POST /api/trpc/subscription.createCheckout` - チェックアウトセッションを作成
- `POST /api/trpc/subscription.handleCheckoutSuccess` - チェックアウト成功を処理

### 使用回数関連

- `GET /api/trpc/usage.canUse` - 使用可能かどうかを確認
- `POST /api/trpc/usage.increment` - 使用回数をインクリメント
- `GET /api/trpc/usage.getStats` - 使用統計を取得

---

## サポート

問題が発生した場合は、以下をご確認ください：

1. ログファイルを確認: `.manus-logs/devserver.log`
2. ブラウザのコンソールエラーを確認
3. 環境変数が正しく設定されていることを確認

---

## ライセンス

MIT License

---

**最終更新**: 2026年1月27日
