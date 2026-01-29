import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Shield, TrendingUp } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: TrendingUp,
      title: "市場価格の追跡",
      description: "リアルタイムで市場価格を監視し、最高の利益機会を発見",
    },
    {
      icon: Zap,
      title: "高速検索",
      description: "モデル名やSKUで瞬時に商品を検索・フィルター",
    },
    {
      icon: Shield,
      title: "安全な管理",
      description: "あなたのデータは安全に保護されています",
    },
  ];

  const stripeCheckoutUrl = "https://buy.stripe.com/test_4gM6oH6aI00a8h13G04Ni0e";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">フリマ価格値付けツール</h1>
          <div className="flex gap-3">
            {isAuthenticated ? (
              <a href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">ダッシュボード</Button>
              </a>
            ) : (
              <>
                <a href={getLoginUrl()}>
                  <Button variant="outline">ログイン</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              フリマ市場で<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                最高の利益を実現
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              リアルタイムな市場価格データと高度な分析ツールで、
              あなたの販売戦略を最適化します。
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a href={stripeCheckoutUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg text-lg">
                今すぐ申し込む（490円）
              </Button>
            </a>
            <a href={getLoginUrl()}>
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 font-semibold py-3 px-8 rounded-lg text-lg">
                ログイン
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            強力な機能
          </h3>
          <p className="text-slate-400 text-lg">
            フリマ市場での成功に必要なすべての機能を備えています
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            シンプルな価格設定
          </h3>
          <p className="text-slate-400 text-lg">
            1回限りの支払いで、永遠にアクセス可能
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Free Plan */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">無料プラン</CardTitle>
              <CardDescription>基本機能を試す</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-3xl font-bold text-white">¥0</p>
                <p className="text-slate-400 text-sm">永遠に無料</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-green-400" />
                  基本的な検索機能
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-green-400" />
                  最大10商品まで
                </li>
              </ul>
              <a href={getLoginUrl()}>
                <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700">
                  無料で始める
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="bg-gradient-to-br from-blue-900 to-slate-800 border-blue-600 relative">
            <div className="absolute -top-3 right-6 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              推奨
            </div>
            <CardHeader>
              <CardTitle className="text-white">プレミアムプラン</CardTitle>
              <CardDescription>フル機能を利用</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-3xl font-bold text-white">¥490</p>
                <p className="text-slate-300 text-sm">1回限りの支払い</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-200">
                  <Check className="w-5 h-5 text-green-400" />
                  すべての検索機能
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <Check className="w-5 h-5 text-green-400" />
                  無制限の商品管理
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <Check className="w-5 h-5 text-green-400" />
                  高度な分析ツール
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <Check className="w-5 h-5 text-green-400" />
                  優先サポート
                </li>
              </ul>
              <a href={stripeCheckoutUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  今すぐ申し込む
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-12 text-center space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            今すぐ始めましょう
          </h3>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            わずか490円で、フリマ市場での販売戦略を最適化してください。
          </p>
          <a href={stripeCheckoutUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg text-lg">
              申し込む
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center text-slate-400 text-sm">
          <p>&copy; 2026 フリマ価格値付けツール. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
