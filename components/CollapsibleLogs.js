'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';

const levelColors = {
  ERROR: { badge: 'bg-red-100 text-red-800', text: 'text-red-600' },
  WARN: { badge: 'bg-yellow-100 text-yellow-800', text: 'text-yellow-600' },
  INFO: { badge: 'bg-blue-100 text-blue-800', text: 'text-blue-600' },
  DEBUG: { badge: 'bg-gray-100 text-gray-800', text: 'text-gray-600' },
};

export default function CollapsibleLogs({ logs }) {
  const [expandedId, setExpandedId] = useState(null);
  const [isTableOpen, setIsTableOpen] = useState(true);

  const toggleRow = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Table Header */}
      <button
        onClick={() => setIsTableOpen(!isTableOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-150 transition-colors border-b border-gray-200"
      >
        <div className="flex items-center space-x-3">
          <FileText size={20} className="text-slate-600" />
          <h3 className="font-semibold text-gray-900">System Logs</h3>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700">
            {logs.length} entries
          </span>
        </div>
        {isTableOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Table Content */}
      {isTableOpen && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left font-semibold text-gray-900 w-32">
                  Level
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900 w-32">
                  Service
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">
                  Message
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900 w-40">
                  Timestamp
                </th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tbody key={log.id}>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3">
                      <span className={`${levelColors[log.level].badge} px-2 py-1 rounded-full text-xs font-medium`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-700 font-medium">{log.service}</td>
                    <td className="px-6 py-3 text-gray-700 max-w-md truncate">
                      {log.message}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-xs">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-2 py-3 text-center">
                      {log.details && (
                        <button
                          onClick={() => toggleRow(log.id)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          {expandedId === log.id ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                  {expandedId === log.id && log.details && (
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <td colSpan={5} className="px-6 py-4">
                        <p className="font-semibold text-gray-900 mb-2">Details:</p>
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                          {log.details}
                        </pre>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {logs.length === 0 && isTableOpen && (
        <div className="px-6 py-12 text-center text-gray-500">
          <FileText size={32} className="mx-auto mb-2 opacity-50" />
          <p>No logs available</p>
        </div>
      )}
    </div>
  );
}
