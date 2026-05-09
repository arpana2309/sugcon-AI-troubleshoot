# Setup Instructions - Sitecore AI Troubleshooter

## Project Overview

This is a complete, production-ready Next.js application called **Sitecore AI Troubleshooter** - an intelligent troubleshooting dashboard with:

✅ **Dashboard** - AI-powered issue analysis with chat input  
✅ **Logs** - Filterable system logs viewer  
✅ **Deployments** - Deployment tracking dashboard  
✅ **Alerts** - Real-time alert management  
✅ **Responsive UI** - Mobile-first design with Tailwind CSS  
✅ **Type-Safe** - Full TypeScript support  

## Installation Steps

### Option 1: Windows (PowerShell/CMD)

```powershell
cd d:\sugon_2026\sugcon-AI-troubleshoot

# Double-click QUICKSTART.bat OR run:
npm install --legacy-peer-deps
```

### Option 2: Manual Installation

```bash
cd d:\sugon_2026\sugcon-AI-troubleshoot

# Install dependencies (choose one method):
npm install --legacy-peer-deps
# OR if network issues:
npm install --no-audit --no-fund --omit=dev
```

### Option 3: Using Package Manager (if npm fails)

If npm is having network issues, try:
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

Then open: **http://localhost:3000**

The app will:
- Auto-reload on file changes
- Show TypeScript errors in terminal
- Display helpful error messages in browser

### Production Mode

```bash
npm run build
npm start
```

Open: **http://localhost:3000**

## Project Structure

```
sugcon-AI-troubleshoot/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard (home page)
│   ├── layout.tsx         # Root layout with sidebar
│   ├── globals.css        # Global styles
│   ├── logs/
│   │   └── page.tsx       # Logs page
│   ├── deployments/
│   │   └── page.tsx       # Deployments page
│   └── alerts/
│       └── page.tsx       # Alerts page
│
├── components/             # React components
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── ChatInput.tsx      # Chat input form
│   ├── ResponseCards.tsx  # Analysis response cards
│   └── CollapsibleLogs.tsx # Logs table
│
├── public/                # Static assets (add images/icons here)
│
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # Tailwind CSS config
├── next.config.js         # Next.js config
├── postcss.config.js      # PostCSS config
└── README.md              # Project documentation
```

## Key Features

### 1. Dashboard (/dashboard)
- **Chat Input** - Report issues naturally
- **Response Cards** - Structured analysis with:
  - Issue Summary
  - Root Cause Analysis
  - Impact Assessment
  - Recommended Fixes
  - Severity Levels (critical, high, medium, low)
- **Collapsible Logs** - System logs with filtering
- **Empty State** - Helpful onboarding for new users

### 2. Logs Page (/logs)
- **Filter by Level** - ERROR, WARN, INFO, DEBUG
- **Expandable Rows** - View detailed log information
- **Live Stats** - Show filtered vs total logs
- **Service Tracking** - See which service generated each log

### 3. Deployments Page (/deployments)
- **Deployment Cards** - Status, version, and duration
- **Environment Tracking** - Production, Staging, Testing, Development
- **Status Indicators** - Success, Failed, In Progress, Pending
- **Quick Stats** - Summary counts for each status

### 4. Alerts Page (/alerts)
- **Alert Cards** - Severity color-coded (Critical → Low)
- **Filter by Status** - Active, Acknowledged, Resolved
- **Alert Actions** - Acknowledge/Dismiss alerts
- **Statistics** - Count by severity and status

### 5. Sidebar Navigation
- **Responsive** - Collapses on mobile with hamburger menu
- **Active States** - Shows current page highlight
- **Brand Styling** - Custom "Sitecore AI" branding
- **Version Info** - Footer with app version and tagline

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | Next.js 14.2 |
| **Frontend** | React 18 |
| **Styling** | Tailwind CSS 3 |
| **Icons** | Lucide React |
| **Language** | TypeScript 5 |
| **Type Definitions** | @types/node, @types/react |

## Customization

### Change Colors

Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      'sitecore-blue': '#0068B5',  // ← Change here
      'sitecore-dark': '#1a1a1a',
      'sitecore-light': '#f5f5f5',
    },
  },
},
```

### Add New Pages

1. Create folder: `app/newpage/`
2. Create file: `app/newpage/page.tsx`
3. Add to sidebar in `components/Sidebar.tsx`

### Connect to Real API

In `app/page.tsx`, replace the mock `setTimeout` with real API calls:
```typescript
const response = await fetch('/api/analyze', {
  method: 'POST',
  body: JSON.stringify({ issue: message })
});
```

## Scripts

```bash
npm run dev        # Start dev server (port 3000)
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

## Troubleshooting

### Port 3000 Already in Use
```bash
lsof -i :3000        # Check what's using it
kill -9 <PID>        # Kill the process
```

### Module Not Found Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
npm run build -- --debug  # Get more details
```

### Memory Issues
```bash
# Increase Node memory allocation
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

## Performance Tips

1. **Images**: Add images to `public/` folder for faster loading
2. **Code Splitting**: Next.js automatically splits code by page
3. **Static Generation**: Mark pages as static when possible
4. **Caching**: Set cache headers in API routes

## Deployment

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Server
```bash
npm run build
npm start
# or use PM2:
pm2 start "npm start" --name "sitecore-ai"
```

## Environment Variables

Create `.env.local` in project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Sitecore AI Troubleshooter
```

## Browser Support

✅ Chrome/Edge 90+  
✅ Firefox 88+  
✅ Safari 15+  
✅ Mobile browsers (iOS Safari, Chrome Android)  

## License

ISC

## Author

Ruchi Mishra

## Support

For issues or questions:
1. Check the README.md in project root
2. Review component documentation in code
3. Check Next.js docs: https://nextjs.org/docs

---

**Happy troubleshooting! 🚀**
