"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Star, Send, CheckCircle } from "lucide-react";
import { submitReview, type ReviewFormState } from "@/actions/review";
import { SERVICES } from "@/data/constants";

const initialState: ReviewFormState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-3 bg-brand-orange hover:bg-safety-orange disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 px-8 rounded-lg text-lg transition-all"
    >
      {pending ? (
        "Submitting..."
      ) : (
        <>
          <Send className="w-5 h-5" />
          Submit Review
        </>
      )}
    </button>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors || errors.length === 0) return null;
  return <p className="text-red-500 text-sm mt-1">{errors[0]}</p>;
}

export default function SubmitReviewPage() {
  const [state, formAction] = useFormState(submitReview, initialState);
  const [rating, setRating] = useState(5);

  if (state.success) {
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
            action={formAction}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            {state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {state.error}
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
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                placeholder="John Smith"
              />
              <FieldError errors={state.fieldErrors?.name} />
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
                name="city"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                placeholder="Lexington"
              />
              <FieldError errors={state.fieldErrors?.city} />
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
                name="service_type"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
              >
                <option value="">Select a service</option>
                {SERVICES.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
              <FieldError errors={state.fieldErrors?.service_type} />
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-brand-black mb-2">
                Your Rating *
              </label>
              <input type="hidden" name="rating" value={rating} />
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <FieldError errors={state.fieldErrors?.rating} />
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
                name="comment"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us about your experience with Rodriguez Towing..."
              />
              <FieldError errors={state.fieldErrors?.comment} />
            </div>

            {/* Submit Button */}
            <SubmitButton />
          </form>
        </div>
      </div>
    </section>
  );
}
