"use client";

import { useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { SERVICES } from "@/data/constants";

export default function SubmitReviewPage() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    rating: 5,
    comment: "",
    service_type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const { error: submitError } = await supabase.from("reviews").insert([
        {
          name: formData.name,
          city: formData.city || null,
          rating: formData.rating,
          comment: formData.comment,
          service_type: formData.service_type || null,
          is_approved: false,
        },
      ]);

      if (submitError) throw submitError;

      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-16 md:py-24 bg-gray-50 min-h-[60vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-brand-black mb-2">
                Thank You!
              </h2>
              <p className="text-gray-600 mb-6">
                Your review has been submitted and is pending approval. We
                appreciate your feedback!
              </p>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-safety-orange text-black font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
              Share Your <span className="text-brand-orange">Experience</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Had a great experience with Rodriguez Towing? We&apos;d love to
              hear about it!
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-brand-black mb-2"
              >
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                placeholder="John Smith"
              />
            </div>

            {/* City */}
            <div className="mb-6">
              <label
                htmlFor="city"
                className="block text-sm font-semibold text-brand-black mb-2"
              >
                City (optional)
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                placeholder="Lexington"
              />
            </div>

            {/* Service Type */}
            <div className="mb-6">
              <label
                htmlFor="service_type"
                className="block text-sm font-semibold text-brand-black mb-2"
              >
                Service Used (optional)
              </label>
              <select
                id="service_type"
                value={formData.service_type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    service_type: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
              >
                <option value="">Select a service</option>
                {SERVICES.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-brand-black mb-2">
                Your Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= formData.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label
                htmlFor="comment"
                className="block text-sm font-semibold text-brand-black mb-2"
              >
                Your Review *
              </label>
              <textarea
                id="comment"
                required
                rows={5}
                value={formData.comment}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, comment: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us about your experience with Rodriguez Towing..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-3 bg-brand-orange hover:bg-safety-orange disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 px-8 rounded-lg text-lg transition-all"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Review
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
