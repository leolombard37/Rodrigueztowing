import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import ContactsTable from "@/components/admin/ContactsTable";

async function getContacts() {
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
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }

  return data || [];
}

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">
          View and respond to customer messages.
        </p>
      </div>

      {/* Contacts Table */}
      <ContactsTable initialContacts={contacts} />
    </div>
  );
}
