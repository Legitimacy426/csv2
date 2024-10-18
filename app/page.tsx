import CSVImporter from '@/components/CSVImporter';

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">CSV Importer</h1>
      <CSVImporter />
    </div>
  );
}