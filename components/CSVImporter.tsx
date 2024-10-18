"use client"

import React, { useState } from 'react';
import FileUploader from './FileUploader';
import RawFilePreview from './RawFilePreview';
import ColumnMapper from './ColumnMapper';
import ImportProgress from './ImportProgress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const CSVImporter: React.FC = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [rawData, setRawData] = useState<string>('');
  const [mappedColumns, setMappedColumns] = useState<string[]>([]);
  const [importProgress, setImportProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setStep(2);
  };

  const handleRawDataPreview = (data: string) => {
    setRawData(data);
    setStep(3);
  };

  const handleColumnMapping = (columns: string[]) => {
    setMappedColumns(columns);
    setStep(4);
  };

  const handleImport = async () => {
    // Simulating import process
    for (let i = 0; i <= 100; i += 10) {
      setImportProgress(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    toast({
      title: "Import Completed",
      description: "Your CSV data has been successfully imported!",
    });
    // Reset the importer
    setStep(1);
    setFile(null);
    setRawData('');
    setMappedColumns([]);
    setImportProgress(0);
  };

  return (
    <div className="space-y-8">
      {step === 1 && <FileUploader onFileUpload={handleFileUpload} />}
      {step === 2 && (
        <>
          <RawFilePreview file={file} onDataParsed={handleRawDataPreview} />
          <Button onClick={() => setStep(3)}>Continue</Button>
        </>
      )}
      {step === 3 && (
        <ColumnMapper rawData={rawData} onColumnsMapped={handleColumnMapping} />
      )}
      {step === 4 && (
        <>
          <ImportProgress progress={importProgress} />
          <Button onClick={handleImport}>Start Import</Button>
        </>
      )}
    </div>
  );
};

export default CSVImporter;