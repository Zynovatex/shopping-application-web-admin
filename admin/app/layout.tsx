import { Inter } from "next/font/google";
import "./globals.css";
import GlobalLoader from "@/components/common/GlobalLoader";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/UserContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { NotificationProvider } from "@/context/NotificationContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingProvider>
          <UserProvider>
            <NotificationProvider>
              <GlobalLoader />

              <Toaster
                position="top-right"
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

              {children}
            </NotificationProvider>
          </UserProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
