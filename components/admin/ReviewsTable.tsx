"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Star, Check, X, Trash2 } from "lucide-react";

interface Review {
  id: string;
  name: string;
  city: string | null;
  rating: number;
  comment: string;
  service_type: string | null;
  is_approved: boolean;
  created_at: string;
}

interface ReviewsTableProps {
  initialReviews: Review[];
}

export default function ReviewsTable({ initialReviews }: ReviewsTableProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel("reviews-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reviews",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setReviews((prev) => [payload.new as Review, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setReviews((prev) =>
              prev.map((r) =>
                r.id === payload.new.id ? (payload.new as Review) : r
              )
            );
          } else if (payload.eventType === "DELETE") {
            setReviews((prev) => prev.filter((r) => r.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const approveReview = async (id: string) => {
    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: true })
      .eq("id", id);

    if (error) {
      console.error("Error approving review:", error);
      return;
    }

    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_approved: true } : r))
    );
  };

  const rejectReview = async (id: string) => {
    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: false })
      .eq("id", id);

    if (error) {
      console.error("Error rejecting review:", error);
      return;
    }

    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_approved: false } : r))
    );
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    const { error } = await supabase.from("reviews").delete().eq("id", id);

    if (error) {
      console.error("Error deleting review:", error);
      return;
    }

    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === "all") return true;
    if (filter === "pending") return !r.is_approved;
    if (filter === "approved") return r.is_approved;
    return true;
  });

  const pendingCount = reviews.filter((r) => !r.is_approved).length;
  const approvedCount = reviews.filter((r) => r.is_approved).length;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-brand-orange text-black"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All ({reviews.length})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "approved"
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Approved ({approvedCount})
        </button>
      </div>

      {/* Reviews */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
          <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No reviews found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
                review.is_approved ? "border-green-500" : "border-yellow-500"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        review.is_approved
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {review.is_approved ? "Approved" : "Pending"}
                    </span>
                    {review.service_type && (
                      <span className="text-xs text-gray-500">
                        {review.service_type}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 mb-3">{review.comment}</p>

                  {/* Author */}
                  <p className="text-sm text-gray-500">
                    — {review.name}
                    {review.city && `, ${review.city}`}
                  </p>

                  {/* Date */}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 ml-4">
                  {!review.is_approved && (
                    <button
                      onClick={() => approveReview(review.id)}
                      className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                      title="Approve"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  )}
                  {review.is_approved && (
                    <button
                      onClick={() => rejectReview(review.id)}
                      className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors"
                      title="Unapprove"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
