'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type Contact = {
  id: string;
  name: string;
  company: string;
  title: string;
  email: string;
  phone: string;
  dateAdded: string;
};

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    company: 'Tech Corp',
    title: 'Software Engineer',
    email: 'john@techcorp.com',
    phone: '+1 (555) 123-4567',
    dateAdded: '2024-02-20',
  },
  {
    id: '2',
    name: 'Jane Smith',
    company: 'Design Studio',
    title: 'Creative Director',
    email: 'jane@designstudio.com',
    phone: '+1 (555) 987-6543',
    dateAdded: '2024-02-19',
  },
];

export function ContactsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts] = useState<Contact[]>(mockContacts);

  const filteredContacts = contacts.filter((contact) =>
    Object.values(contact).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{contact.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{contact.title}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{contact.company}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">{contact.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{contact.phone}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredContacts.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No contacts found
          </div>
        )}
      </div>
    </div>
  );
} 