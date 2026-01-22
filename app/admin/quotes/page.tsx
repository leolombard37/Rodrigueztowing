import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import QuotesTable from "@/components/admin/QuotesTable";

async function getQuotes() {
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

  const { data, error } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }

  return data || [];
}

export default async function QuotesPage() {
  const quotes = await getQuotes();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quote Requests</h1>
        <p className="text-gray-500 mt-1">
          Manage and respond to customer quote requests.
        </p>
      </div>

      {/* Quotes Table */}
      <QuotesTable initialQuotes={quotes} />
    </div>
  );
}
