# Sitecore AI Troubleshooter

A modern, AI-powered troubleshooting dashboard built with Next.js for analyzing system issues and providing structured solutions.

## Features

✨ **Key Features:**
- 🤖 AI-powered issue analysis with structured responses
- 📊 Card-based dashboard with severity levels
- 💬 Chat interface for reporting issues
- 📋 Collapsible logs table with filtering
- 🚀 Deployment tracking dashboard
- 🚨 Real-time alerts management
- 📱 Fully responsive design
- 🎨 Clean, modern UI with Tailwind CSS
- ⚡ Fast navigation with Next.js App Router

## Pages

- **Dashboard** (`/`) - Main troubleshooting interface with AI chat and response cards
- **Logs** (`/logs`) - System logs viewer with filtering by severity level
- **Deployments** (`/deployments`) - Track deployment status across environments
- **Alerts** (`/alerts`) - Manage and monitor system alerts

## Components

- **Sidebar** - Navigation component with active states
- **ChatInput** - Input form for reporting issues
- **ResponseCards** - Structured display of analysis results (issue, root cause, impact, fix, severity)
- **CollapsibleLogs** - Expandable logs table with details

## Tech Stack

- **Frontend:** React 18, Next.js 14
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Language:** TypeScript
- **Build Tool:** Next.js

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout with sidebar
│   ├── page.tsx            # Dashboard page
│   ├── globals.css         # Global styles
│   ├── logs/
│   │   └── page.tsx        # Logs page
│   ├── deployments/
│   │   └── page.tsx        # Deployments page
│   └── alerts/
│       └── page.tsx        # Alerts page
├── components/
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── ChatInput.tsx       # Chat input component
│   ├── ResponseCards.tsx   # Analysis response cards
│   └── CollapsibleLogs.tsx # Logs table component
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

## Usage Examples

### Reporting an Issue
1. Navigate to the Dashboard
2. Type your issue in the chat input (e.g., "Database queries are timing out")
3. Click "Send" to analyze
4. View structured analysis with severity level

### Viewing Logs
1. Go to Logs page
2. Filter by log level (ALL, ERROR, WARN, INFO, DEBUG)
3. Click on log rows to expand and view details

### Monitoring Deployments
1. Navigate to Deployments page
2. View all service deployments with status indicators
3. See deployment stats at a glance

### Managing Alerts
1. Go to Alerts page
2. Filter alerts by status (all, active, acknowledged, resolved)
3. Acknowledge or dismiss alerts as needed

## Future Enhancements

- [ ] Connect to real AI API
- [ ] Database integration for log persistence
- [ ] User authentication
- [ ] Alert notification system
- [ ] Export logs and reports
- [ ] Custom dashboard themes
- [ ] API integration for real-time data

## License

ISC

## Author

Ruchi Mishra
