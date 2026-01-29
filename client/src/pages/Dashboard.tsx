import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, ShoppingCart } from "lucide-react";

// デモ用 Nike スニーカーデータ
const DEMO_PRODUCTS = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High OG",
    sku: "AJ1-RHO-001",
    size: "US 10",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    retailPrice: 170,
    marketPrice: 450,
    profit: 280,
    profitRate: 164.7,
  },
  {
    id: 2,
    name: "Nike Dunk Low Retro",
    sku: "DUNK-LOW-002",
    size: "US 11",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    retailPrice: 110,
    marketPrice: 320,
    profit: 210,
    profitRate: 190.9,
  },
  {
    id: 3,
    name: "Air Max 90",
    sku: "AMAX90-003",
    size: "US 9",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    retailPrice: 130,
    marketPrice: 280,
    profit: 150,
    profitRate: 115.4,
  },
  {
    id: 4,
    name: "Jordan 11 Retro",
    sku: "J11-RET-004",
    size: "US 12",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    retailPrice: 220,
    marketPrice: 680,
    profit: 460,
    profitRate: 209.1,
  },
  {
    id: 5,
    name: "Nike SB Dunk Low",
    sku: "SBDUNK-005",
    size: "US 10.5",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    retailPrice: 115,
    marketPrice: 380,
    profit: 265,
    profitRate: 230.4,
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"profit" | "profitRate">("profitRate");

  // 検索とソート処理
  const filteredProducts = useMemo(() => {
    let filtered = DEMO_PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ソート処理
    filtered.sort((a, b) => {
      if (sortBy === "profit") {
        return b.profit - a.profit;
      } else {
        return b.profitRate - a.profitRate;
      }
    });

    return filtered;
  }, [searchQuery, sortBy]);

  const totalProfit = filteredProducts.reduce((sum, p) => sum + p.profit, 0);
  const avgProfitRate = filteredProducts.length > 0
    ? (filteredProducts.reduce((sum, p) => sum + p.profitRate, 0) / filteredProducts.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ヘッダー */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Nike せどり管理ダッシュボード
          </h1>
          <p className="text-slate-400">
            リセール市場の価格推移を追跡し、最高の利益機会を発見
          </p>
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">
                総利益（表示中）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">
                ¥{totalProfit.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">
                平均利益率
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">
                {avgProfitRate}%
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">
                商品数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-400">
                {filteredProducts.length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 検索・フィルター */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">検索とフィルター</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <Input
                placeholder="モデル名またはSKUで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setSortBy("profitRate")}
                variant={sortBy === "profitRate" ? "default" : "outline"}
                className={sortBy === "profitRate" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                利益率でソート
              </Button>
              <Button
                onClick={() => setSortBy("profit")}
                variant={sortBy === "profit" ? "default" : "outline"}
                className={sortBy === "profit" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                利益額でソート
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 商品リスト */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">商品リスト</CardTitle>
            <CardDescription>
              {filteredProducts.length} 件の商品を表示中
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">商品名</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">SKU</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">サイズ</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">定価</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">市場価格</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">利益</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">利益率</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="py-3 px-4 text-white font-medium">{product.name}</td>
                      <td className="py-3 px-4 text-slate-300">{product.sku}</td>
                      <td className="py-3 px-4 text-slate-300">{product.size}</td>
                      <td className="py-3 px-4 text-right text-slate-300">¥{product.retailPrice.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-blue-400 font-semibold">
                        ¥{product.marketPrice.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-green-400 font-semibold">
                        ¥{product.profit.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-green-400 font-bold">
                        {product.profitRate.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-400">検索条件に一致する商品がありません</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* フッター */}
        <div className="text-center text-slate-500 text-sm">
          <p>このダッシュボードはデモンストレーション用です。実際のデータは API から取得されます。</p>
        </div>
      </div>
    </div>
  );
}
