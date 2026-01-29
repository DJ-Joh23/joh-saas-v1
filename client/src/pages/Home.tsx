import { Button } from '@/components/ui/button';
import { ArrowRight, Smartphone } from 'lucide-react';

export default function Home() {
  const stripeCheckoutUrl = 'https://buy.stripe.com/test_4gM6oH6aI00a8h13G04Ni0e';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">PriceFlow</div>
          <a
            href={stripeCheckoutUrl}
            className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition"
          >
            導入する
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            カメラをかざすだけ。<br />
            その商品の<span className="text-blue-400">「適正価格」</span>が、<br />
            一瞬でわかる。
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            店舗せどりの必需品。AIが商品画像を解析し、フリマ相場と利益幅をAR表示。
          </p>
          <a
            href={stripeCheckoutUrl}
            className="inline-block"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg transition transform hover:scale-105"
            >
              今すぐ490円で導入する
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Product Visualization Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Phone Mockup */}
            <div className="flex justify-center">
              <div className="relative w-80 h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border-8 border-slate-700 shadow-2xl overflow-hidden">
                {/* Phone Status Bar */}
                <div className="bg-slate-950 px-6 py-2 flex justify-between items-center text-white text-xs">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Phone Content */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 h-full flex flex-col items-center justify-center p-6 text-center">
                  {/* Scan Result Header */}
                  <div className="mb-8">
                    <p className="text-slate-400 text-sm mb-2">スキャン結果</p>
                    <h3 className="text-white text-lg font-semibold">ロジクール M240</h3>
                  </div>

                  {/* Main Price Display */}
                  <div className="mb-8">
                    <p className="text-slate-500 text-xs mb-2">フリマ市場 推定相場</p>
                    <div className="text-5xl font-bold text-white mb-1">¥1,200</div>
                    <p className="text-slate-400 text-xs">市場より ¥1,280 お得</p>
                  </div>

                  {/* Reference Price */}
                  <div className="mb-8">
                    <p className="text-slate-500 text-xs mb-1">新品参考価格</p>
                    <p className="text-slate-400 text-sm line-through">¥2,480</p>
                  </div>

                  {/* Profit Indicator */}
                  <div className="bg-green-900/30 border border-green-700/50 rounded-lg px-4 py-2 mb-6">
                    <p className="text-green-400 text-sm font-semibold">利益率 +151%</p>
                  </div>

                  {/* Close Button */}
                  <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition">
                    閉じる
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Feature Description */}
            <div className="space-y-8">
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">スマホ1台で完結</h3>
                    <p className="text-slate-300">商品をカメラでスキャンするだけ。複雑な操作は一切不要です。</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 text-blue-400 font-bold">⚡</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">AI解析で一瞬判定</h3>
                    <p className="text-slate-300">AIが商品画像を瞬時に解析。フリマ相場と利益幅をリアルタイム表示。</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 text-blue-400 font-bold">💰</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">利益を最大化</h3>
                    <p className="text-slate-300">適正価格を知ることで、仕入れ判断が正確に。無駄な買い付けを削減。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">シンプルな価格</h2>
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">PriceFlow Pro</h3>
            <div className="text-5xl font-bold text-blue-400 mb-2">¥490</div>
            <p className="text-slate-400 mb-8">1回限りの購入</p>
            <a href={stripeCheckoutUrl}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold rounded-lg transition">
                今すぐ導入する
              </Button>
            </a>
          </div>

          <p className="text-slate-400 text-sm">
            クレジットカード決済。安全で迅速。
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-slate-900/20 border-t border-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            店舗せどりを、もっと効率的に。
          </h2>
          <p className="text-slate-300 mb-8">
            PriceFlowで、毎日の仕入れ判断が変わります。
          </p>
          <a href={stripeCheckoutUrl}>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg transition transform hover:scale-105"
            >
              490円で今すぐ始める
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4 text-center text-slate-500 text-sm">
        <p>© 2026 PriceFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}
