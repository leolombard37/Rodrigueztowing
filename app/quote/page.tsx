"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Phone, CheckCircle, Truck } from "lucide-react";
import { submitQuote, type QuoteFormState } from "@/actions/quote";
import { PHONE_NUMBER, PHONE_DISPLAY, SERVICES } from "@/data/constants";

const initialState: QuoteFormState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-safety-orange text-black font-bold py-4 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Submitting..." : "Request Free Quote"}
    </button>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors || errors.length === 0) return null;
  return <p className="text-red-500 text-sm mt-1">{errors[0]}</p>;
}

export default function QuotePage() {
  const [state, formAction] = useFormState(submitQuote, initialState);

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
                English / Espanol
              </p>
            </div>
          </div>

          {/* Quote Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              {state.success ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-brand-black mb-2">
                    Quote Request Received!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We&apos;ll review your request and contact you shortly with a
                    quote.
                  </p>
                  <a
                    href="/quote"
                    className="text-brand-orange font-semibold hover:underline"
                  >
                    Request another quote
                  </a>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-brand-black mb-6">
                    Quote Request Form
                  </h2>
                  <form action={formAction} className="space-y-6">
                    {/* Contact Info Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                          placeholder="John Doe"
                        />
                        <FieldError errors={state.fieldErrors?.name} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                          placeholder="(555) 555-5555"
                        />
                        <FieldError errors={state.fieldErrors?.phone} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                        placeholder="john@example.com"
                      />
                      <FieldError errors={state.fieldErrors?.email} />
                    </div>

                    {/* Service Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Type *
                      </label>
                      <select
                        name="service_type"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      >
                        <option value="">Select a service...</option>
                        {SERVICES.map((service) => (
                          <option key={service.id} value={service.name}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                      <FieldError errors={state.fieldErrors?.service_type} />
                    </div>

                    {/* Vehicle Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vehicle Information *
                      </label>
                      <input
                        type="text"
                        name="vehicle_info"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                        placeholder="Year, Make, Model (e.g., 2020 Honda Accord)"
                      />
                      <FieldError errors={state.fieldErrors?.vehicle_info} />
                    </div>

                    {/* Locations Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pickup Location *
                        </label>
                        <input
                          type="text"
                          name="pickup_location"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                          placeholder="Address or intersection"
                        />
                        <FieldError errors={state.fieldErrors?.pickup_location} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Drop-off Location
                        </label>
                        <input
                          type="text"
                          name="dropoff_location"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                          placeholder="Destination address"
                        />
                        <FieldError errors={state.fieldErrors?.dropoff_location} />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        name="notes"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent resize-none"
                        placeholder="Any additional details (e.g., vehicle condition, special requirements)"
                      />
                      <FieldError errors={state.fieldErrors?.notes} />
                    </div>

                    {state.error && (
                      <p className="text-red-500 text-sm">{state.error}</p>
                    )}

                    <SubmitButton />
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
