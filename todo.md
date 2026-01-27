# Joh SaaS V1 - Project TODO

## Phase 2: Database Schema
- [x] Supabase認証テーブルの設計
- [x] ユーザープロフィールテーブルの実装
- [x] 購読情報テーブル（subscription）の実装
- [x] 使用回数トラッキングテーブル（usage_log）の実装
- [x] データベーススキーマのマイグレーション

## Phase 3: Supabase Authentication
- [x] Supabaseクライアントの初期化
- [x] ログイン機能の実装
- [x] ログアウト機能の実装
- [x] セッション管理の実装
- [x] 認証状態の永続化

## Phase 4: Usage Limit Feature
- [x] 使用回数のトラッキング機能
- [x] 日次リセット機能の実装
- [x] 制限チェック機能（無料：10回/日、有料：無制限）
- [x] 使用回数API エンドポイント

## Phase 5: Stripe Integration
- [x] Stripeクライアントの初期化
- [x] チェックアウトセッション作成機能
- [x] ウェブフック処理（支払い成功時）
- [x] 購読ステータスの更新
- [x] キャンセル機能

## Phase 6: Frontend UI
- [x] ダッシュボードページの実装
- [x] ユーザープロフィールコンポーネント
- [x] 使用回数表示コンポーネント
- [x] Proアップグレードボタン
- [x] 決済画面への遷移
- [x] 購読ステータス表示

## Phase 7: Testing & Bug Fixes
- [x] 認証フローのテスト
- [x] 使用回数制限のテスト
- [x] Stripe決済フローのテスト
- [x] バグ修正と最適化

## Phase 8: Documentation
- [x] 環境変数設定ガイドの作成
- [x] README.mdの更新
- [x] API仕様書の作成
- [x] セットアップ手順の記載

## Phase 9: GitHub Push
- [ ] GitHubへのコードプッシュ
- [ ] 最終確認と動作検証
