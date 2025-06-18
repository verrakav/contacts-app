//  hooks
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
// shadcn components
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
// components

//  TODO: extract into types
type TContact = {
  name: string;
  phone: string;
};

export default function App() {
  //  TODO: change the state | dummy data at the moment
  const [contacts, setContacts] = useState<TContact[]>([
    { name: "mmom", phone: "098765" },
    { name: "dad", phone: "23456" },
  ]);
  const [newContact, setNewContact] = useState<TContact | null>(null);

  async function loadContacts() {
    const res: TContact[] = await invoke("get_contacts");
    setContacts(res);
  }

  useEffect(() => {
    loadContacts(); // you forgot () here
  }, []);

  return (
    <div className="flex h-screen w-full">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Center Column */}
      <div className="flex flex-col flex-1 p-6 overflow-auto border-r">
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        <PhonesList contacts={contacts} />
      </div>

      {/* Right Column */}
      <div className="w-1/3 p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Add Contact</h2>
        <InputSection
          newContact={newContact}
          setNewContact={setNewContact}
          loadContacts={loadContacts}
        />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gray-100 dark:bg-gray-900 p-4 shadow-md flex flex-col">
      <h1 className="text-xl font-semibold mb-6">Contacts list</h1>
      <nav className="flex flex-col gap-2">
        <Button variant="ghost" className="justify-start">
          Contacts
        </Button>
        <Button variant="ghost" className="justify-start">
          Add Contact
        </Button>
        <Button variant="ghost" className="justify-start">
          Settings
        </Button>
      </nav>
    </aside>
  );
}

function PhonesList({ contacts }: { contacts: TContact[] }) {
  return (
    <ul>
      {contacts.map((contact: TContact, idx: number) => (
        <li key={idx}>
          {contact.name} - {contact.phone}
        </li>
      ))}
    </ul>
  );
}

function InputSection({
  newContact,
  setNewContact,
  loadContacts,
}: {
  newContact: TContact | null;
  setNewContact: React.Dispatch<React.SetStateAction<TContact | null>>;
  loadContacts: () => void;
}) {
  async function handleAdd() {
    if (!newContact || !newContact.name || !newContact.phone) return;
    await invoke("add_contact", { newContact });
    setNewContact(null);
    loadContacts();
  }
  return (
    <>
      <Input
        className="p-4 m-4"
        type="text"
        placeholder="name"
        value={newContact?.name ?? ""}
        onChange={(e) =>
          setNewContact((prev) => {
            if (!prev) return { name: e.target.value, phone: "" };
            return { ...prev, name: e.target.value };
          })
        }
      />
      <Input
        className="p-4 m-4"
        type="text"
        placeholder="number"
        value={newContact?.phone ?? ""}
        onChange={(e) =>
          setNewContact((prev) => {
            if (!prev) return { name: "", phone: e.target.value };
            return { ...prev, phone: e.target.value };
          })
        }
      />
      <Button className="p-4 m-4" onClick={handleAdd}>
        Add
      </Button>
    </>
  );
}
