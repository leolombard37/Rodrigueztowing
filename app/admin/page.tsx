import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { FileText, MessageSquare, Star, Clock, ArrowRight } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";

async function getStats() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Get counts in parallel
  const [quotesResult, contactsResult, reviewsResult, pendingReviewsResult] =
    await Promise.all([
      supabase
        .from("quote_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase
        .from("contacts")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("reviews")
        .select("*", { count: "exact", head: true })
        .eq("is_approved", true),
      supabase
        .from("reviews")
        .select("*", { count: "exact", head: true })
        .eq("is_approved", false),
    ]);

  return {
    pendingQuotes: quotesResult.count || 0,
    totalContacts: contactsResult.count || 0,
    approvedReviews: reviewsResult.count || 0,
    pendingReviews: pendingReviewsResult.count || 0,
  };
}

async function getRecentQuotes() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return data || [];
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentQuotes = await getRecentQuotes();

  return (
    <div>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">
          Welcome back! Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        <StatsCard
          title="Pending Quotes"
          value={stats.pendingQuotes}
          icon={FileText}
          color="orange"
          subtitle="Awaiting response"
        />
        <StatsCard
          title="Total Contacts"
          value={stats.totalContacts}
          icon={MessageSquare}
          color="blue"
        />
        <StatsCard
          title="Approved Reviews"
          value={stats.approvedReviews}
          icon={Star}
          color="green"
        />
        <StatsCard
          title="Pending Reviews"
          value={stats.pendingReviews}
          icon={Clock}
          color="purple"
          subtitle="Awaiting approval"
        />
      </div>

      {/* Recent Quotes */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Quotes</h2>
          <Link
            href="/admin/quotes"
            className="text-brand-orange hover:underline text-sm font-medium flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentQuotes.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No quote requests yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentQuotes.map((quote) => (
              <div
                key={quote.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{quote.name}</p>
                    <p className="text-sm text-gray-500">
                      {quote.service_type} - {quote.vehicle_info}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        quote.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : quote.status === "contacted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {quote.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(quote.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
