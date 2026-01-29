import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, Crown, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const subscriptionStatus = trpc.subscription.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const usageStats = trpc.usage.getStats.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const createCheckout = trpc.subscription.createCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create checkout session");
    },
  });

  const handleCheckoutSuccess = trpc.subscription.handleCheckoutSuccess.useMutation({
    onSuccess: () => {
      toast.success("Upgrade successful! You now have Pro access.");
      subscriptionStatus.refetch();
      usageStats.refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to process upgrade");
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (sessionId && isAuthenticated) {
      handleCheckoutSuccess.mutate({ sessionId });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please log in to access your dashboard</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const isPro = subscriptionStatus.data?.plan === "pro";
  const usagePercentage = usageStats.data
    ? (usageStats.data.todayUsage / usageStats.data.limit) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Welcome, {user?.name || "User"}!
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Manage your account and track your usage
          </p>
        </div>

        {/* Plan Status Card */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Your Plan</CardTitle>
                <CardDescription>Current subscription status</CardDescription>
              </div>
              {isPro && (
                <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900 px-4 py-2 rounded-lg">
                  <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="font-semibold text-amber-900 dark:text-amber-100">Pro</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Plan Type</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white capitalize">
                  {subscriptionStatus.data?.plan || "Loading..."}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 capitalize">
                  {subscriptionStatus.data?.status || "Loading..."}
                </p>
              </div>
            </div>

            {!isPro && (
              <a
                href="https://buy.stripe.com/test_4gM6oH6aI00a8h13G04Ni0e"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </a>
            )}
          </CardContent>
        </Card>

        {/* Usage Card */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Usage</CardTitle>
            <CardDescription>
              {isPro
                ? "You have unlimited usage with Pro"
                : "Free plan: 10 requests per day"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {usageStats.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Usage Today
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {usageStats.data?.todayUsage || 0} / {usageStats.data?.limit === Infinity ? "∞" : usageStats.data?.limit || 10}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        usagePercentage > 80
                          ? "bg-red-500"
                          : usagePercentage > 50
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    />
                  </div>
                </div>

                {!isPro && usageStats.data && usageStats.data.remaining <= 3 && (
                  <div className="flex gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-900 dark:text-yellow-200">
                        Running low on requests
                      </p>
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        You have {usageStats.data.remaining} requests left today. Upgrade to Pro for unlimited access.
                      </p>
                    </div>
                  </div>
                )}

                {!isPro && usageStats.data && usageStats.data.remaining === 0 && (
                  <div className="flex gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900 dark:text-red-200">
                        Daily limit reached
                      </p>
                      <p className="text-sm text-red-800 dark:text-red-300">
                        You have used all your daily requests. Upgrade to Pro to continue using the service.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
              <p className="text-slate-900 dark:text-white font-medium">{user?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Member Since</p>
              <p className="text-slate-900 dark:text-white font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
