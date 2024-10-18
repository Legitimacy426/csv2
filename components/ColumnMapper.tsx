"use client"

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Papa from 'papaparse';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ColumnMapperProps {
  rawData: string;
  onColumnsMapped: (columns: string[]) => void;
}

const ColumnMapper: React.FC<ColumnMapperProps> = ({ rawData, onColumnsMapped }) => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [mappedColumns, setMappedColumns] = useState<string[]>([]);
  const [sampleData, setSampleData] = useState<string[][]>([]);

  useEffect(() => {
    const parseResult = Papa.parse(rawData, { preview: 4, skipEmptyLines: true });
    if (parseResult.data.length > 0) {
      setHeaders(parseResult.data[0] as string[]);
      setSampleData(parseResult.data.slice(1) as string[][]);
    }
  }, [rawData]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newHeaders = Array.from(headers);
    const [reorderedItem] = newHeaders.splice(result.source.index, 1);
    newHeaders.splice(result.destination.index, 0, reorderedItem);

    setHeaders(newHeaders);
  };

  const addColumn = (header: string) => {
    setMappedColumns([...mappedColumns, header]);
    setHeaders(headers.filter(h => h !== header));
  };

  const removeColumn = (header: string) => {
    setHeaders([...headers, header]);
    setMappedColumns(mappedColumns.filter(h => h !== header));
  };

  const handleColumnRename = (index: number, newName: string) => {
    const updatedColumns = [...mappedColumns];
    updatedColumns[index] = newName;
    setMappedColumns(updatedColumns);
  };

  const handleSubmit = () => {
    onColumnsMapped(mappedColumns);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Map Columns</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="headers" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-100 rounded-lg"
            >
              {headers.map((header, index) => (
                <Draggable key={header} draggableId={header} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-2 rounded shadow cursor-move"
                      onClick={() => addColumn(header)}
                    >
                      {header}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Mapped Columns</h3>
        <div className="space-y-2">
          {mappedColumns.map((column, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={column}
                onChange={(e) => handleColumnRename(index, e.target.value)}
                className="flex-grow"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeColumn(column)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Sample Data</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {mappedColumns.map((header, index) => (
                  <th key={index} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {mappedColumns.map((header, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row[headers.indexOf(header)]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Button onClick={handleSubmit} className="mt-4">
        Confirm Mapping
      </Button>
    </div>
  );
};

export default ColumnMapper;