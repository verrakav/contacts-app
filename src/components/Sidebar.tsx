import { Button } from "./ui/button";

export default function Sidebar() {
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
