import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { StoreProvider } from "./context/Store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <UserProvider>
          <body className={inter.className}>
            <Navbar />
            {children}
          </body>
        </UserProvider>
      </StoreProvider>
    </html>
  );
}
