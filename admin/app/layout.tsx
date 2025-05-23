import { Inter } from "next/font/google";
import "./globals.css";
import GlobalLoader from "@/components/common/GlobalLoader";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/UserContext";
import { LoadingProvider } from "@/context/LoadingContext";

// Load Inter font from Google with latin subset
const inter = Inter({ subsets: ["latin"] });

/**
 * RootLayout component
 * Wraps the entire app with context providers and global components
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* User context provider */}
        <LoadingProvider>
        <UserProvider>
          {/* Global loading spinner */}
          <GlobalLoader />

          {/* Toast notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#fff",
                color: "#333",
                fontWeight: "500",
                border: "1px solid #ddd",
                padding: "12px 16px",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              },
            }}
          />

          {/* Render nested pages */}
          {children}
        </UserProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
