import { Header } from '@/components/Header';
import { CardScanner } from '@/components/CardScanner';
import { ContactsList } from '@/components/ContactsList';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Scan Business Card</h2>
            <CardScanner />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Recent Contacts</h2>
            <ContactsList />
          </div>
        </div>
      </div>
    </main>
  );
} 