import "@/styles/globals.css";
import { Providers } from "@/providers/provider";
import { montserrat } from "@/components/fonts";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
