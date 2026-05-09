'use client';

import { CheckCircle, AlertCircle, Clock, Zap } from 'lucide-react';

const deployments = [
  {
    id: '1',
    name: 'Content Service v2.3.4',
    status: 'success',
    version: '2.3.4',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    duration: '5m 32s',
    environment: 'Production',
  },
  {
    id: '2',
    name: 'API Gateway v1.9.2',
    status: 'success',
    version: '1.9.2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    duration: '3m 15s',
    environment: 'Production',
  },
  {
    id: '3',
    name: 'Auth Service v3.1.0',
    status: 'failed',
    version: '3.1.0',
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    duration: '2m 10s',
    environment: 'Staging',
  },
  {
    id: '4',
    name: 'Cache Layer v1.5.0',
    status: 'in-progress',
    version: '1.5.0',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    duration: '2m 30s',
    environment: 'Testing',
  },
  {
    id: '5',
    name: 'Logger Service v2.0.0',
    status: 'pending',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    duration: '-',
    environment: 'Development',
  },
];

const statusConfig = {
  success: {
    icon: CheckCircle,
    badge: 'bg-green-100 text-green-800',
    color: 'text-green-600',
  },
  failed: {
    icon: AlertCircle,
    badge: 'bg-red-100 text-red-800',
    color: 'text-red-600',
  },
  'in-progress': {
    icon: Zap,
    badge: 'bg-blue-100 text-blue-800',
    color: 'text-blue-600',
  },
  pending: {
    icon: Clock,
    badge: 'bg-yellow-100 text-yellow-800',
    color: 'text-yellow-600',
  },
};

export default function DeploymentsPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Deployments</h1>
        <p className="text-gray-600">
          Monitor and track all service deployments across environments.
        </p>
      </div>

      {/* Deployment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deployments.map((deployment) => {
          const config = statusConfig[deployment.status];
          const Icon = config.icon;

          return (
            <div
              key={deployment.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Status Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className={`${config.badge} px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1`}>
                  <Icon size={16} />
                  <span>{deployment.status.toUpperCase()}</span>
                </div>
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {deployment.environment}
                </span>
              </div>

              {/* Service Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{deployment.name}</h3>
              <p className="text-sm text-gray-600 mb-4">v{deployment.version}</p>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-900">{deployment.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deployed:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(deployment.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button className="mt-4 w-full px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                View Details
              </button>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Successful</p>
          <p className="text-2xl font-bold text-green-600">
            {deployments.filter((d) => d.status === 'success').length}
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Failed</p>
          <p className="text-2xl font-bold text-red-600">
            {deployments.filter((d) => d.status === 'failed').length}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">In Progress</p>
          <p className="text-2xl font-bold text-blue-600">
            {deployments.filter((d) => d.status === 'in-progress').length}
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {deployments.filter((d) => d.status === 'pending').length}
          </p>
        </div>
      </div>
    </main>
  );
}
