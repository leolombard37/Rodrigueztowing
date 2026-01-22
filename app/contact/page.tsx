"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { submitContact, type ContactFormState } from "@/actions/contact";
import { PHONE_NUMBER, PHONE_DISPLAY } from "@/data/constants";

const initialState: ContactFormState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-safety-orange text-black font-bold py-4 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        "Sending..."
      ) : (
        <>
          <Send className="w-5 h-5" />
          Send Message
        </>
      )}
    </button>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors || errors.length === 0) return null;
  return <p className="text-red-500 text-sm mt-1">{errors[0]}</p>;
}

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContact, initialState);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="text-brand-orange">Us</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Need a tow? Have questions? We&apos;re here 24/7 to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-brand-black mb-6">
              Get In Touch
            </h2>
            <p className="text-gray-600 mb-8">
              For immediate assistance, call us directly. We respond to
              emergencies 24/7, 365 days a year.
            </p>

            <div className="space-y-6">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-4 p-4 bg-brand-orange/10 rounded-lg hover:bg-brand-orange/20 transition-colors"
              >
                <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call Now - 24/7</p>
                  <p className="text-xl font-bold text-brand-black">
                    {PHONE_DISPLAY}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                <div className="w-12 h-12 bg-brand-black rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-brand-black">
                    info@rodrigueztowing.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                <div className="w-12 h-12 bg-brand-black rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Area</p>
                  <p className="text-lg font-semibold text-brand-black">
                    Kentucky - I-75 & I-65 Corridors
                  </p>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">We speak:</p>
              <p className="font-semibold">English / Espanol</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            {state.success ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brand-black mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 mb-6">
                  We&apos;ll get back to you as soon as possible.
                </p>
                <a
                  href="/contact"
                  className="text-brand-orange font-semibold hover:underline"
                >
                  Send another message
                </a>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-brand-black mb-6">
                  Send a Message
                </h2>
                <form action={formAction} className="space-y-6">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent resize-none"
                      placeholder="How can we help you?"
                    />
                    <FieldError errors={state.fieldErrors?.message} />
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
  );
}
