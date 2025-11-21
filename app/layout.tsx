import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";
import { FilterProvider } from "@/context/FilterContext";
import SessionWrapper from "./providers/SessionWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionWrapper>
        <FilterProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </FilterProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
