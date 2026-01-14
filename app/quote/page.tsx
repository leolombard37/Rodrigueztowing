"use client";

import { useState } from "react";
import { Phone, CheckCircle, Truck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { PHONE_NUMBER, PHONE_DISPLAY, SERVICES } from "@/data/constants";

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service_type: "",
    vehicle_info: "",
    pickup_location: "",
    dropoff_location: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const { error: supabaseError } = await supabase
        .from("quote_requests")
        .insert([formData]);

      if (supabaseError) throw supabaseError;

      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        service_type: "",
        vehicle_info: "",
        pickup_location: "",
        dropoff_location: "",
        notes: "",
      });
    } catch (err) {
      setError("Something went wrong. Please call us directly.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get a <span className="text-brand-orange">Free Quote</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Fill out the form below and we&apos;ll get back to you with a quote.
            For emergencies, call us directly.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Emergency Call Card */}
          <div className="lg:col-span-1">
            <div className="bg-brand-orange rounded-xl p-6 text-black sticky top-28">
              <Truck className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Need Help Now?</h3>
              <p className="mb-6 opacity-80">
                For immediate towing assistance, skip the form and call us
                directly. We&apos;re available 24/7.
              </p>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center justify-center gap-2 bg-black text-white font-bold py-4 px-6 rounded-lg hover:bg-brand-dark transition-colors"
              >
                <Phone className="w-5 h-5" />
                {PHONE_DISPLAY}
              </a>
              <p className="text-center mt-4 text-sm opacity-70">
                🇺🇸 English / 🇲🇽 Español
              </p>
            </div>
          </div>

          {/* Quote Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              {isSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-brand-black mb-2">
                    Quote Request Received!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We&apos;ll review your request and contact you shortly with a
                    quote.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-brand-orange font-semibold hover:underline"
                  >
                    Request another quote
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-brand-black mb-6">
                    Quote Request Form
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Info Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                          placeholder="(555) 555-5555"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Service Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Type *
                      </label>
                      <select
                        required
                        value={formData.service_type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            service_type: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      >
                        <option value="">Select a service...</option>
                        {SERVICES.map((service) => (
                          <option key={service.id} value={service.name}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Vehicle Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vehicle Information *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.vehicle_info}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vehicle_info: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                        placeholder="Year, Make, Model (e.g., 2020 Honda Accord)"
                      />
                    </div>

                    {/* Locations Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pickup Location *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.pickup_location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pickup_location: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                          placeholder="Address or intersection"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Drop-off Location
                        </label>
                        <input
                          type="text"
                          value={formData.dropoff_location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dropoff_location: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                          placeholder="Destination address"
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent resize-none"
                        placeholder="Any additional details (e.g., vehicle condition, special requirements)"
                      />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-safety-orange text-black font-bold py-4 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Request Free Quote"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
