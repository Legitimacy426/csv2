"use client"

import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ImportProgressProps {
  progress: number;
}

const ImportProgress: React.FC<ImportProgressProps> = ({ progress }) => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Import Progress</h2>
      <Progress value={progress} className="w-full" />
      <p className="mt-2 text-sm text-gray-600">{progress}% Complete</p>
    </div>
  );
};

export default ImportProgress;