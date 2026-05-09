'use client';

import CollapsibleLogs from '@/components/CollapsibleLogs';
import { Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LogsPage() {
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [allLogs, setAllLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/logs');
        if (!response.ok) throw new Error('Failed to fetch logs');
        const data = await response.json();
        setAllLogs(data.logs || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching logs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs =
    selectedLevel === 'ALL'
      ? allLogs
      : allLogs.filter((log) => log.level === selectedLevel);

  return (
    <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Logs</h1>
        <p className="text-gray-600">View and filter all system logs from your infrastructure.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-red-800">
          {error}
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filter by Level</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['ALL', 'ERROR', 'WARN', 'INFO', 'DEBUG'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedLevel === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          {isLoading ? 'Loading...' : `Showing ${filteredLogs.length} of ${allLogs.length} logs`}
        </p>
      </div>

      {/* Logs Table */}
      <CollapsibleLogs logs={filteredLogs} />
    </main>
  );
}