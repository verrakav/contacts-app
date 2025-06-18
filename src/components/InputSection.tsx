//  tauri api
import { invoke } from "@tauri-apps/api/core";
//  types
import { TContact } from "@/Types";
//  shadcn components
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function InputSection({
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
