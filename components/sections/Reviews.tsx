"use client";

import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Review {
  id: string;
  name: string;
  city?: string;
  rating: number;
  comment: string;
  service_type?: string;
}

// Fallback reviews if database is empty
const fallbackReviews: Review[] = [
  {
    id: "1",
    name: "Michael Johnson",
    city: "Lexington",
    rating: 5,
    comment: "Called at 2 AM when my truck broke down on I-75. They arrived in 25 minutes! Professional and friendly service. Highly recommend.",
    service_type: "Heavy Duty Towing",
  },
  {
    id: "2",
    name: "Sarah Williams",
    city: "Louisville",
    rating: 5,
    comment: "Best towing service in Kentucky! They helped me with a flat tire and were so quick and professional. Will definitely use again.",
    service_type: "Roadside Assistance",
  },
  {
    id: "3",
    name: "Carlos Rodriguez",
    city: "Bowling Green",
    rating: 5,
    comment: "Excelente servicio! Me ayudaron cuando mi carro se quedó sin gasolina en la I-65. Llegaron rápido y el precio fue justo.",
    service_type: "Roadside Assistance",
  },
  {
    id: "4",
    name: "Jennifer Davis",
    city: "Richmond",
    rating: 5,
    comment: "Had my car towed after an accident. The driver was compassionate and made a stressful situation much easier. Thank you Rodriguez Towing!",
    service_type: "Light Duty Towing",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("is_approved", true)
          .order("created_at", { ascending: false })
          .limit(6);

        if (!error && data && data.length > 0) {
          setReviews(data);
        }
      } catch (err) {
        // Use fallback reviews
        console.log("Using fallback reviews");
      }
    }

    fetchReviews();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            What Our <span className="text-brand-orange">Customers Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it. Here&apos;s what Kentucky drivers
            have to say about Rodriguez Towing.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-xl p-6 relative"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-brand-orange/20 absolute top-4 right-4" />

              {/* Rating */}
              <StarRating rating={review.rating} />

              {/* Comment */}
              <p className="text-gray-700 mt-4 mb-4 text-sm leading-relaxed">
                &ldquo;{review.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-brand-black">{review.name}</p>
                {review.city && (
                  <p className="text-sm text-gray-500">{review.city}, KY</p>
                )}
                {review.service_type && (
                  <p className="text-xs text-brand-orange mt-1">
                    {review.service_type}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Write Review CTA */}
        <div className="text-center mt-8">
          <a
            href="/reviews"
            className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-safety-orange text-black font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Write a Review
          </a>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 bg-brand-black rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                4.9
              </div>
              <div className="flex justify-center mt-2">
                <StarRating rating={5} />
              </div>
              <p className="text-gray-400 text-sm mt-2">Average Rating</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">
                500+
              </div>
              <p className="text-gray-400 text-sm mt-2">Happy Customers</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">
                24/7
              </div>
              <p className="text-gray-400 text-sm mt-2">Available</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">
                30 min
              </div>
              <p className="text-gray-400 text-sm mt-2">Avg Response</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
