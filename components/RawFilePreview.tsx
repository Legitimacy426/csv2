"use client"

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RawFilePreviewProps {
  file: File | null;
  onDataParsed: (data: string) => void;
}

const RawFilePreview: React.FC<RawFilePreviewProps> = ({ file, onDataParsed }) => {
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setPreview(text.slice(0, 1000)); // Preview first 1000 characters
        onDataParsed(text);
      };
      reader.readAsText(file);
    }
  }, [file, onDataParsed]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Raw File Preview</h2>
      <ScrollArea className="h-[300px] w-full border rounded">
        <pre className="p-4 text-sm">{preview}</pre>
      </ScrollArea>
    </div>
  );
};

export default RawFilePreview;