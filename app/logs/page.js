'use client';

import CollapsibleLogs from '@/components/CollapsibleLogs';
import { Filter, AlertCircle, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LogsPage() {
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [timeRange, setTimeRange] = useState('7d'); // Changed default to 7 days
  const [allLogs, setAllLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const fetchLogs = async (range) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/logs?timeRange=${range}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch logs');
      }
      
      const data = await response.json();
      setAllLogs(data.logs || []);
      setLastFetch(new Date(data.fetchedAt).toLocaleTimeString());
    } catch (err) {
      setError(err.message);
      console.error('Error fetching logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(timeRange);
  }, [timeRange]);

  const filteredLogs =
    selectedLevel === 'ALL'
      ? allLogs
      : allLogs.filter((log) => log.level === selectedLevel);

  const errorCount = allLogs.length;
  const criticalCount = allLogs.filter((log) => log.level === 'CRITICAL').length;

  return (
    <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Logs - Error Analysis</h1>
        <p className="text-gray-600">
          Showing errors, exceptions, and failures detected in your infrastructure.
        </p>
      </div>

      {/* Alert Summary */}
      {errorCount > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="text-red-600" size={20} />
              <h3 className="font-semibold text-red-900">Total Errors</h3>
            </div>
            <p className="text-3xl font-bold text-red-600">{errorCount}</p>
          </div>
          
          {criticalCount > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="text-orange-600" size={20} />
                <h3 className="font-semibold text-orange-900">Critical</h3>
              </div>
              <p className="text-3xl font-bold text-orange-600">{criticalCount}</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-red-800">
          ⚠️ {error}
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Time Range Filter */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Filter size={20} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Time Range</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['1h', '6h', '24h', '2d', '7d', '30d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range === '1h' && 'Last 1 Hour'}
                  {range === '6h' && 'Last 6 Hours'}
                  {range === '24h' && 'Last 24 Hours'}
                  {range === '2d' && 'Last 2 Days'}
                  {range === '7d' && 'Last 7 Days'}
                  {range === '30d' && 'Last 30 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Filter size={20} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Severity Level</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['ALL', 'CRITICAL', 'ERROR'].map((level) => (
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
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            {isLoading ? '⏳ Loading...' : `Showing ${filteredLogs.length} of ${allLogs.length} errors`}
            {lastFetch && <span className="ml-2">• Last updated: {lastFetch}</span>}
          </p>
          <button
            onClick={() => fetchLogs(timeRange)}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Logs Table */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">
          ⏳ Fetching error logs from OpenObserve...
        </div>
      ) : errorCount === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-12 text-center">
          <p className="text-green-800 font-semibold">✅ No errors detected in the last {timeRange}</p>
        </div>
      ) : (
        <CollapsibleLogs logs={filteredLogs} />
      )}
    </main>
  );
}