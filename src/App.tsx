import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

type TContact = {
  name: string;
  phone: string;
};

export default function App() {
  const [contacts, setContacts] = useState<TContact[]>([]);
  // TODO: refactor into an object state
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  async function loadContacts() {
    const res: TContact[] = await invoke("get_contacts");
    setContacts(res);
  }

  async function handleAdd() {
    if (!name || !phone) return;
    await invoke("add_contact", { name, phone });
    setName("");
    setPhone("");
    loadContacts();
  }

  useEffect(() => {
    loadContacts;
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Contacts list</h1>
      <ul>
        {contacts.map((contact: TContact, idx: number) => (
          <li key={idx}>
            {contact.name} - {contact.phone}
          </li>
        ))}
      </ul>
      <h2>Add contact</h2>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
