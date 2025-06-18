//  hooks
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
// types
import { TContact } from "./Types";
// components
import Sidebar from "./components/Sidebar";
import PhonesList from "./components/PhonesList";
import InputSection from "./components/InputSection";

export default function App() {
  //  TODO: change the state | dummy data at the moment
  const [contacts, setContacts] = useState<TContact[]>([
    { name: "mom", phone: "098765" },
    { name: "dad", phone: "23456" },
  ]);
  const [newContact, setNewContact] = useState<TContact | null>(null);

  async function loadContacts() {
    const res: TContact[] = await invoke("get_contacts");
    setContacts(res);
  }

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className="flex h-screen w-full">
      {/* left section */}
      <Sidebar />

      {/* center section */}
      <div className="flex flex-col flex-1 p-6 overflow-auto border-r">
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        <PhonesList contacts={contacts} />
      </div>

      {/* right section */}
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
