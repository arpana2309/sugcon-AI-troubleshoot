import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Sitecore AI Troubleshooter",
  description: "AI-powered troubleshooting dashboard for Sitecore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com" async></script>
        <style>{`body { margin: 0; padding: 0; }`}</style>
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
