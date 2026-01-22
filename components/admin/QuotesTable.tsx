"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Phone, Mail, MapPin, Car, ChevronDown, X } from "lucide-react";

interface Quote {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service_type: string;
  vehicle_info: string;
  pickup_location: string;
  dropoff_location: string | null;
  notes: string | null;
  status: "pending" | "contacted" | "completed";
  created_at: string;
}

interface QuotesTableProps {
  initialQuotes: Quote[];
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  contacted: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

export default function QuotesTable({ initialQuotes }: QuotesTableProps) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel("quotes-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "quote_requests",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setQuotes((prev) => [payload.new as Quote, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setQuotes((prev) =>
              prev.map((q) =>
                q.id === payload.new.id ? (payload.new as Quote) : q
              )
            );
          } else if (payload.eventType === "DELETE") {
            setQuotes((prev) => prev.filter((q) => q.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const updateStatus = async (id: string, status: Quote["status"]) => {
    const { error } = await supabase
      .from("quote_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
      return;
    }

    // Update local state (realtime will also update, but this is faster)
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );

    if (selectedQuote?.id === id) {
      setSelectedQuote({ ...selectedQuote, status });
    }
  };

  const filteredQuotes =
    filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Filters */}
      <div className="p-4 border-b border-gray-100 flex gap-2">
        {["all", "pending", "contacted", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-brand-orange text-black"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== "all" && (
              <span className="ml-2 text-xs">
                ({quotes.filter((q) => q.status === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-500">
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Service</th>
              <th className="px-6 py-3 font-medium">Vehicle</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredQuotes.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No quotes found.
                </td>
              </tr>
            ) : (
              filteredQuotes.map((quote) => (
                <tr
                  key={quote.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedQuote(quote)}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{quote.name}</p>
                    <p className="text-sm text-gray-500">{quote.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {quote.service_type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {quote.vehicle_info}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        statusColors[quote.status]
                      }`}
                    >
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(quote.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <select
                        value={quote.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateStatus(quote.id, e.target.value as Quote["status"]);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="appearance-none bg-gray-100 border-0 rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedQuote && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedQuote(null)}
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Quote Details</h3>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Customer Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Customer
                </h4>
                <p className="font-semibold text-lg">{selectedQuote.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a
                    href={`tel:${selectedQuote.phone}`}
                    className="text-brand-orange hover:underline"
                  >
                    {selectedQuote.phone}
                  </a>
                </div>
                {selectedQuote.email && (
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a
                      href={`mailto:${selectedQuote.email}`}
                      className="text-brand-orange hover:underline"
                    >
                      {selectedQuote.email}
                    </a>
                  </div>
                )}
              </div>

              {/* Service Details */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Service
                </h4>
                <p className="font-medium">{selectedQuote.service_type}</p>
              </div>

              {/* Vehicle */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Vehicle
                </h4>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-gray-400" />
                  <p>{selectedQuote.vehicle_info}</p>
                </div>
              </div>

              {/* Locations */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Locations
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Pickup</p>
                      <p>{selectedQuote.pickup_location}</p>
                    </div>
                  </div>
                  {selectedQuote.dropoff_location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Drop-off</p>
                        <p>{selectedQuote.dropoff_location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedQuote.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Notes
                  </h4>
                  <p className="bg-gray-50 p-3 rounded-lg text-sm">
                    {selectedQuote.notes}
                  </p>
                </div>
              )}

              {/* Status */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Status
                </h4>
                <div className="flex gap-2">
                  {(["pending", "contacted", "completed"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedQuote.id, s)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedQuote.status === s
                          ? statusColors[s]
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Call Button */}
              <a
                href={`tel:${selectedQuote.phone}`}
                className="block w-full bg-brand-orange text-black font-bold py-3 px-4 rounded-lg text-center hover:bg-orange-500 transition-colors"
              >
                Call Customer
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
