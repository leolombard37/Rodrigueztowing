"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Phone, Mail, X, MessageSquare } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  created_at: string;
}

interface ContactsTableProps {
  initialContacts: Contact[];
}

export default function ContactsTable({ initialContacts }: ContactsTableProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel("contacts-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contacts",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setContacts((prev) => [payload.new as Contact, ...prev]);
          } else if (payload.eventType === "DELETE") {
            setContacts((prev) => prev.filter((c) => c.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Stats */}
      <div className="p-4 border-b border-gray-100">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{contacts.length}</span>{" "}
          total messages
        </p>
      </div>

      {/* Table */}
      <div className="divide-y divide-gray-100">
        {contacts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No contact messages yet.</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <span className="text-xs text-gray-400">
                      {formatDate(contact.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{contact.phone}</p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {contact.message}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <a
                    href={`tel:${contact.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-brand-orange text-black rounded-lg hover:bg-orange-500 transition-colors"
                    title="Call"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Message Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Customer Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">From</h4>
                <p className="font-semibold text-lg">{selectedContact.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="text-brand-orange hover:underline"
                  >
                    {selectedContact.phone}
                  </a>
                </div>
                {selectedContact.email && (
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-brand-orange hover:underline"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Message
                </h4>
                <p className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>

              {/* Timestamp */}
              <div>
                <p className="text-sm text-gray-500">
                  Received on{" "}
                  {new Date(selectedContact.created_at).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={`tel:${selectedContact.phone}`}
                  className="flex-1 bg-brand-orange text-black font-bold py-3 px-4 rounded-lg text-center hover:bg-orange-500 transition-colors"
                >
                  Call Back
                </a>
                {selectedContact.email && (
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="flex-1 bg-gray-900 text-white font-bold py-3 px-4 rounded-lg text-center hover:bg-gray-800 transition-colors"
                  >
                    Send Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
