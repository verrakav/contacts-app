export default function PhonesList({ contacts }: { contacts: TContact[] }) {
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
