import { Inter } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/context/LoadingContext";
import GlobalLoader from "@/components/common/GlobalLoader";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/UserContext"; // ✅ Import the User Context

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingProvider>
          <UserProvider> {/* ✅ Wrap your app with UserProvider */}
            <GlobalLoader />
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
            {children}
          </UserProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
  