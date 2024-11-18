import "@/styles/globals.css";
import { Providers } from "@/providers/provider";
import { montserrat } from "@/components/fonts";
import { Toaster } from "sonner";

export const metadata = {
  title: "Project:Gameplan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
