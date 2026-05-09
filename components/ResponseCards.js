'use client';

import { AlertCircle, Check, AlertTriangle, Info } from 'lucide-react';

const severityConfig = {
  critical: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-800',
    icon: AlertCircle,
  },
  high: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-800',
    icon: AlertTriangle,
  },
  medium: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-800',
    icon: Info,
  },
  low: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-800',
    icon: Check,
  },
};

export default function ResponseCards({ response }) {
  const config = severityConfig[response.severity];
  const SeverityIcon = config.icon;

  return (
    <div className={`${config.bg} border ${config.border} rounded-lg p-6 space-y-4`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Issue</h3>
          <p className="text-gray-700 mt-1">{response.issue}</p>
        </div>
        <div className={`${config.badge} px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 flex-shrink-0`}>
          <SeverityIcon size={16} />
          <span>{response.severity.toUpperCase()}</span>
        </div>
      </div>

      {/* Root Cause */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-semibold text-gray-900 mb-2">🔍 Root Cause</h4>
        <p className="text-gray-700 text-sm">{response.rootCause}</p>
      </div>

      {/* Impact */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-semibold text-gray-900 mb-2">📊 Impact</h4>
        <p className="text-gray-700 text-sm">{response.impact}</p>
      </div>

      {/* Fix */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-semibold text-gray-900 mb-2">✅ Recommended Fix</h4>
        <p className="text-gray-700 text-sm">{response.fix}</p>
      </div>

      {/* Timestamp */}
      <div className="border-t border-gray-200 pt-3">
        <p className="text-xs text-gray-500">
          {new Date(response.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
