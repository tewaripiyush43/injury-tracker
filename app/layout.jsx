import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { StoreProvider } from "./context/Store";
import { Provider } from "@/lib/apolloClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Injury Tracker",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <UserProvider>
          <StoreProvider>
            <body className={inter.className}>
              <Navbar />
              {children}
            </body>
          </StoreProvider>
        </UserProvider>
      </Provider>
    </html>
  );
}
