import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Crown, Zap, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            SaaS<span className="text-blue-600">Pro</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Button onClick={logout} variant="ghost">
                  Logout
                </Button>
              </>
            ) : (
              <a href={getLoginUrl()}>
                <Button>Sign In</Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
          Powerful SaaS Platform
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Start with a free plan and upgrade to Pro for unlimited access. Simple pricing, powerful features.
        </p>
        {!isAuthenticated ? (
          <a href={getLoginUrl()}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        ) : (
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        )}
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Zap className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Fast & Reliable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Lightning-fast performance with 99.9% uptime guarantee. Built on modern infrastructure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Secure & Safe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Enterprise-grade security with encryption, regular backups, and compliance certifications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Crown className="w-8 h-8 text-amber-600 mb-2" />
              <CardTitle>Pro Features</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Unlock unlimited access with Pro. Priority support and advanced features included.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-4xl font-bold text-slate-900 dark:text-white">$0</p>
                <p className="text-slate-600 dark:text-slate-400">Forever free</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  10 requests per day
                </li>
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Basic support
                </li>
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Community access
                </li>
              </ul>
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    View Dashboard
                  </Button>
                </Link>
              ) : (
                <a href={getLoginUrl()} className="block">
                  <Button variant="outline" className="w-full">
                    Get Started
                  </Button>
                </a>
              )}
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-blue-600 dark:border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>For power users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-4xl font-bold text-slate-900 dark:text-white">$9</p>
                <p className="text-slate-600 dark:text-slate-400">per month</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Unlimited requests
                </li>
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Priority support
                </li>
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  API access
                </li>
              </ul>
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Upgrade Now
                  </Button>
                </Link>
              ) : (
                <a href={getLoginUrl()} className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Get Started
                  </Button>
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <p>&copy; 2026 SaaSPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
