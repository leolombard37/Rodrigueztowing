import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import ReviewsTable from "@/components/admin/ReviewsTable";

async function getReviews() {
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
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data || [];
}

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-500 mt-1">
          Approve or reject customer reviews.
        </p>
      </div>

      {/* Reviews Table */}
      <ReviewsTable initialReviews={reviews} />
    </div>
  );
}
