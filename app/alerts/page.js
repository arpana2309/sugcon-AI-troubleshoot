'use client';

import { AlertTriangle, AlertCircle, Info, Bell, X } from 'lucide-react';
import { useState } from 'react';

const allAlerts = [
  {
    id: '1',
    title: 'Database Connection Pool Exhausted',
    message: 'All 100 connections in pool are in use. New requests will timeout.',
    severity: 'critical',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    source: 'Content Service',
    status: 'active',
  },
  {
    id: '2',
    title: 'High CPU Usage Detected',
    message: 'CPU usage exceeded 90% threshold on production server prod-01',
    severity: 'high',
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    source: 'Infrastructure Monitor',
    status: 'active',
  },
  {
    id: '3',
    title: 'Cache Hit Rate Low',
    message: 'Cache hit rate dropped to 62%, normal is 85%+',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    source: 'Cache Layer',
    status: 'acknowledged',
  },
  {
    id: '4',
    title: 'Disk Space Warning',
    message: 'Available disk space is below 20% on logs volume',
    severity: 'high',
    timestamp: new Date(Date.now() - 2400000).toISOString(),
    source: 'System Monitor',
    status: 'active',
  },
  {
    id: '5',
    title: 'API Response Time Degradation',
    message: 'Average response time increased from 200ms to 800ms',
    severity: 'medium',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    source: 'API Gateway',
    status: 'resolved',
  },
];

const severityConfig = {
  critical: {
    icon: AlertTriangle,
    badge: 'bg-red-100 text-red-800 border-red-300',
    dot: 'bg-red-500',
  },
  high: {
    icon: AlertCircle,
    badge: 'bg-orange-100 text-orange-800 border-orange-300',
    dot: 'bg-orange-500',
  },
  medium: {
    icon: Info,
    badge: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    dot: 'bg-yellow-500',
  },
  low: {
    icon: Info,
    badge: 'bg-blue-100 text-blue-800 border-blue-300',
    dot: 'bg-blue-500',
  },
};

const statusConfig = {
  active: 'Active',
  acknowledged: 'Acknowledged',
  resolved: 'Resolved',
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(allAlerts);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAlerts =
    filterStatus === 'all'
      ? alerts
      : alerts.filter((alert) => alert.status === filterStatus);

  const handleDismiss = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const handleAcknowledge = (id) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, status: 'acknowledged' } : alert
      )
    );
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Bell size={32} className="text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
        </div>
        <p className="text-gray-600">
          Monitor active alerts and their status across your infrastructure.
        </p>
      </div>

      {/* Filter and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Critical</p>
          <p className="text-2xl font-bold text-red-600">
            {alerts.filter((a) => a.severity === 'critical').length}
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">High</p>
          <p className="text-2xl font-bold text-orange-600">
            {alerts.filter((a) => a.severity === 'high').length}
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Medium</p>
          <p className="text-2xl font-bold text-yellow-600">
            {alerts.filter((a) => a.severity === 'medium').length}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Active</p>
          <p className="text-2xl font-bold text-blue-600">
            {alerts.filter((a) => a.status === 'active').length}
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Resolved</p>
          <p className="text-2xl font-bold text-green-600">
            {alerts.filter((a) => a.status === 'resolved').length}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {['all', 'active', 'acknowledged', 'resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={`border rounded-lg p-6 ${config.badge}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`${config.dot} w-3 h-3 rounded-full`}></div>
                      <h3 className="text-lg font-semibold">{alert.title}</h3>
                      <span className="text-xs font-medium px-2 py-1 bg-black bg-opacity-10 rounded">
                        {statusConfig[alert.status]}
                      </span>
                    </div>
                    <p className="mb-3">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span>📍 {alert.source}</span>
                      <span>🕐 {new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {alert.status === 'active' && (
                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        className="px-3 py-1 bg-black bg-opacity-10 hover:bg-opacity-20 rounded text-sm font-medium transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}
                    <button
                      onClick={() => handleDismiss(alert.id)}
                      className="p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-12 text-center">
            <p className="text-xl font-semibold text-green-900 mb-2">✅ All clear!</p>
            <p className="text-green-700">No alerts matching the selected filter.</p>
          </div>
        )}
      </div>
    </main>
  );
}
